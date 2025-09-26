import styled from 'styled-components';

const Tag = styled.span`
  background-color: var(--color-${(props) => props.type}-100);
  border-radius: 100px;
  color: var(--color-${(props) => props.type}-700);
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  text-transform: uppercase;
  width: fit-content;
`;

export default Tag;
