import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import TodayActivity from '../check-in-out/TodayActivity';

import { useCabins } from '../cabins/useCabins';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
  display: grid;
  gap: 2.4rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
`;

const DashboardLayout = () => {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        cabinCount={cabins?.length}
        confirmedStays={confirmedStays}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
