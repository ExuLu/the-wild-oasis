import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';

import styled from 'styled-components';

const Footer = styled.footer`
  color: var(--color-grey-500);
  font-size: 1.2rem;
  padding: 1.6rem 4rem;
  text-align: right;
`;

const Guest = styled.div`
  align-items: center;
  color: var(--color-grey-500);
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.6rem;

  & p:first-of-type {
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;

const Header = styled.header`
  align-items: center;
  background-color: var(--color-brand-500);
  color: #e0e7ff;
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: space-between;
  padding: 2rem 4rem;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    align-items: center;
    display: flex;
    font-size: 1.8rem;
    font-weight: 600;
    gap: 1.6rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Price = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props['data-paid'] ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  border-radius: var(--border-radius-sm);
  color: ${(props) =>
    props['data-paid'] ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  padding: 1.6rem 3.2rem;

  & p:last-child {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  svg {
    color: currentColor !important;
    height: 2.4rem;
    width: 2.4rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

// A purely presentational component
const BookingDataBox = ({ booking }) => {
  const {
    cabins: { name: cabinName },
    cabinPrice,
    created_at,
    endDate,
    extraPrice,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    hasBreakfast,
    isPaid,
    numNights,
    numGuests,
    observations,
    startDate,
    totalPrice,
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observations'
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label='Breakfast included?'>
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price data-paid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extraPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
};

export default BookingDataBox;
