import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';

import { useOutsideClick } from '../hooks/useOutsideClick';

import styled from 'styled-components';

const Menu = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  font-size: 1.4rem;
  gap: 1.6rem;
  padding: 1.2rem 2.4rem;
  text-align: left;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    color: var(--color-grey-400);
    height: 1.6rem;
    transition: all 0.3s;
    width: 1.6rem;
  }
`;

const StyledList = styled.ul`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  position: fixed;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    color: var(--color-grey-700);
    height: 2.4rem;
    width: 2.4rem;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);
  const { ref } = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
};

const Toggle = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === '' || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

Menus.Button = Button;
Menus.List = List;
Menus.Menu = Menu;
Menus.Toggle = Toggle;

export default Menus;
