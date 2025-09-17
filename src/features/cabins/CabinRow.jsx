import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { formatCurrency } from '../../utils/helpers';

import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    id: cabinId,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      image,
      regularPrice,
      discount,
      description,
    });
  }

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
          <Button
            disabled={isCreating}
            onClick={handleDuplicate}
            variation='secondary'
            size='small'
          >
            <HiSquare2Stack />
          </Button>

          <Modal>
            <Modal.Open opens='cabin-edit-form'>
              <Button size='small'>
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name='cabin-edit-form'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens='confirm-delete'>
              <Button size='small' variation='danger'>
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name='confirm-delete'>
              <ConfirmDelete
                resourceName='cabin'
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
