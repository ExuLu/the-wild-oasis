import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

const UpdateUserDataForm = () => {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { isUpdating, updateUser } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input disabled value={email} />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          disabled={isUpdating}
          id='fullName'
          onChange={(e) => setFullName(e.target.value)}
          type='text'
          value={fullName}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          accept='image/*'
          disabled={isUpdating}
          id='avatar'
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isUpdating}
          onClick={handleCancel}
          type='reset'
          variation='secondary'
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
