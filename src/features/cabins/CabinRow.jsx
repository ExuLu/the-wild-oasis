import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import CreateCabinForm from './CreateCabinForm';

import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';

import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

import { formatCurrency } from '../../utils/helpers';

import styled from 'styled-components';

const Cabin = styled.div`
  color: var(--color-grey-600);
  font-family: 'Sono';
  font-size: 1.6rem;
  font-weight: 600;
`;

const Discount = styled.div`
  color: var(--color-green-700);
  font-family: 'Sono';
  font-weight: 500;
`;

const Img = styled.img`
  aspect-ratio: 3 / 2;
  display: block;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  width: 6.4rem;
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const CabinRow = ({ cabin }) => {
  const { createCabin } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const {
    discount,
    description,
    id: cabinId,
    image,
    maxCapacity,
    name,
    regularPrice,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      description,
      discount,
      image,
      maxCapacity,
      name: `Copy of ${name}`,
      regularPrice,
    });
  };

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens='cabin-edit-form'>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens='confirm-delete'>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name='cabin-edit-form'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name='confirm-delete'>
              <ConfirmDelete
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
                resourceName='cabin'
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
