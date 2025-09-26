import supabase from './supabase';

import { supabaseUrl } from '../services/supabase';

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }
};

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  return data;
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);

    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: imageUploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (imageUploadError) {
    console.error(imageUploadError);

    throw new Error(imageUploadError.message);
  }

  const { data: updatedUser, error: imageUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (imageUpdateError) {
    console.error(imageUpdateError);

    throw new Error(imageUpdateError.message);
  }

  return updatedUser;
};
