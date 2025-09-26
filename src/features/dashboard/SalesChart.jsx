import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';

import { useDarkMode } from '../../context/useDarkMode';

import styled from 'styled-components';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const sumPrice = (date, price) =>
    bookings
      ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
      .reduce((acc, cur) => acc + cur[price], 0);
  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: sumPrice(date, 'totalPrice'),
      extraSales: sumPrice(date, 'extraPrice'),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extraSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extraSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={data}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit='$'
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            fill={colors.totalSales.fill}
            name='Total sales'
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
            type='monotone'
            unit='$'
          />
          <Area
            dataKey='extraSales'
            fill={colors.extraSales.fill}
            name='Extra sales'
            stroke={colors.extraSales.stroke}
            strokeWidth={2}
            type='monotone'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
