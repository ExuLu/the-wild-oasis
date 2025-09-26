import { NavLink } from 'react-router-dom';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';

import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    align-items: center;
    color: var(--color-grey-600);
    display: flex;
    font-size: 1.6rem;
    font-weight: 500;
    gap: 1.2rem;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
    color: var(--color-grey-800);
  }

  & svg {
    color: var(--color-grey-400);
    height: 2.4rem;
    transition: all 0.3s;
    width: 2.4rem;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings'>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/cabins'>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/users'>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/settings'>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
