import BookingDataBox from './BookingDataBox';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Tag from '../../ui/Tag';

import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;

  if (!booking.id) return <Empty resource='booking' />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #${bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            <span>Check in</span>
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            disabled={isCheckingOut}
            onClick={() => {
              checkout(bookingId);
            }}
          >
            <span>Check out</span>
          </Button>
        )}

        <Modal>
          <Modal.Open opens='booking-delete'>
            <Button disabled={isDeleting} variation='danger'>
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name='booking-delete'>
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: () => navigate(-1) });
              }}
              resourceName='booking'
            />
          </Modal.Window>
        </Modal>

        <Button onClick={moveBack} variation='secondary'>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
