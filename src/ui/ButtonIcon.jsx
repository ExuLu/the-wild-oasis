import styled from 'styled-components';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.6rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    color: var(--color-brand-600);
    height: 2.2rem;
    width: 2.2rem;
  }
`;

export default ButtonIcon;
