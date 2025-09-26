import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import { useOutsideClick } from '../hooks/useOutsideClick';

import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  position: absolute;
  right: 1.9rem;
  top: 1.2rem;
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    color: var(--color-grey-500);
    height: 2.4rem;
    width: 2.4rem;
  }
`;

const Overlay = styled.div`
  backdrop-filter: blur(4px);
  background-color: var(--backdrop-color);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.5s;
  width: 100%;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  left: 50%;
  padding: 3.2rem 4rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
