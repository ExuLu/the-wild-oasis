import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import Stat from './Stat';

import { formatCurrency } from '../../utils/helpers';

const Stats = ({ bookings, cabinCount, confirmedStays, numDays }) => {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays?.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        color='blue'
        icon={<HiOutlineBriefcase />}
        title='Bookings'
        value={numBookings}
      />
      <Stat
        color='green'
        icon={<HiOutlineBanknotes />}
        title='Sales'
        value={formatCurrency(sales)}
      />
      <Stat
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        title='Check ins'
        value={checkins}
      />
      <Stat
        color='yellow'
        icon={<HiOutlineChartBar />}
        title='Occupancy rate'
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
};

export default Stats;
