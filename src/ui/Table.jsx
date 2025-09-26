import { createContext, useContext } from 'react';

import styled from 'styled-components';

const CommonRow = styled.div`
  align-items: center;
  column-gap: 2.4rem;
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  transition: none;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 2.4rem;
  text-align: center;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
  font-weight: 600;
  padding: 1.6rem 2.4rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledTable = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  font-size: 1.4rem;
  overflow: hidden;
`;

const TableContext = createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Body = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

const Header = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader as='header' columns={columns} role='row'>
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow columns={columns} role='row'>
      {children}
    </StyledRow>
  );
};

Table.Body = Body;
Table.Footer = Footer;
Table.Header = Header;
Table.Row = Row;

export default Table;
