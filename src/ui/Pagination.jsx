import { useSearchParams } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import { PAGE_SIZE } from '../utils/globalConstants';

import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const PaginationButton = styled.button`
  align-items: center;
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  border: none;
  border-radius: var(--border-radius-sm);
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  gap: 0.4rem;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const StyledPagination = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  };
  const previousPage = () => {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', previous);
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
