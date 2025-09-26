import { useSearchParams } from 'react-router-dom';

import styled, { css } from 'styled-components';

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-weight: 500;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const StyledFilter = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
`;

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value) => {
    if (searchParams.get('page')) {
      searchParams.set('page', 1);
    }

    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };

  const currentFilter = searchParams.get(filterField) || options[0]?.value;

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
          key={option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
