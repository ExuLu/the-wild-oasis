import { Link } from 'react-router-dom';

import CheckoutButton from './CheckoutButton';
import Button from '../../ui/Button';
import { Flag } from '../../ui/Flag';
import Tag from '../../ui/Tag';

import styled from 'styled-components';

const Guest = styled.div`
  font-weight: 500;
`;

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const TodayItem = ({ activity }) => {
  const { id, guests, numNights, status } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag type='blue'>Departing</Tag>}

      <Flag alt={`Flag of ${guests.country}`} src={guests.countryFlag} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>

      {status === 'unconfirmed' && (
        <Button
          as={Link}
          size='small'
          to={`/checkin/${id}`}
          variation='primary'
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
