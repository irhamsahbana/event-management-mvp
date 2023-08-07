import localforage from "localforage";

export const getUser = async () => {
  const user = await localforage.getItem('user');
  return user;
}

export const isAdmin = async () => {
  const user = await getUser();
  return user?.role === 'admin';
}

export const isUser = async () => {
  const user = await getUser();
  return user?.role === 'user';
}