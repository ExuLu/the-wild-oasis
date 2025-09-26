import Logo from './Logo';
import MainNav from './MainNav';

import styled from 'styled-components';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  grid-row: 1/-1;
  padding: 3.2rem 2.4rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
