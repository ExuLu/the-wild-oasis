import styled from 'styled-components';

const StyledDataItem = styled.div`
  align-items: center;
  display: flex;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  align-items: center;
  display: flex;
  font-weight: 500;
  gap: 0.8rem;

  & svg {
    color: var(--color-brand-600);
    height: 2rem;
    width: 2rem;
  }
`;

const DataItem = ({ icon, label, children }) => {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
};

export default DataItem;
