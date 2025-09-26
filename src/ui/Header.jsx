import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  padding: 1.2rem 4.8rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
