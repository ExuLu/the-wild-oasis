import styled from 'styled-components';

const StyledSelect = styled.select`
  background-color: var(--color-grey-0);
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
`;

const Select = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect onChange={onChange} value={value} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
