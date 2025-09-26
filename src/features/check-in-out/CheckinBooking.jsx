import { useEffect, useState } from 'react';

import BookingDataBox from '../../features/bookings/BookingDataBox';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';

import { useBooking } from '../bookings/useBooking';
import { useCheckin } from './useCheckin';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useSettings } from '../settings/useSetting';

import { formatCurrency } from '../../utils/helpers';

import styled from 'styled-components';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const { checkin, isCheckingIn } = useCheckin();
  const { booking = {}, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking.isPaid]);

  useEffect(() => {
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking.hasBreakfast]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    guests,
    hasBreakfast,
    id: bookingId,
    numGuests,
    numNights,
    totalPrice,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        breakfast: {
          extraPrice: optionalBreakfastPrice,
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
        bookingId,
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  };

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          id='confirm'
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={addBreakfast}
            id='breakfast'
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button onClick={moveBack} variation='secondary'>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
