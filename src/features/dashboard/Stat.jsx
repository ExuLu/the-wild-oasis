import styled from 'styled-components';

const Icon = styled.div`
  align-items: center;
  aspect-ratio: 1;
  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);
  border-radius: 50%;
  display: flex;
  grid-row: 1 / -1;
  justify-content: center;

  & svg {
    color: var(--color-${(props) => props.color}-700);
    height: 3.2rem;
    width: 3.2rem;
  }
`;

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  column-gap: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  padding: 1.6rem;
  row-gap: 0.4rem;
`;

const Title = styled.h5`
  align-self: end;
  color: var(--color-grey-500);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

const Value = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1;
`;

const Stat = ({ icon, title, value, color }) => {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
};

export default Stat;
