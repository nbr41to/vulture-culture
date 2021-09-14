import { nanoid } from 'nanoid';

export const generateUserId = (): string => {
  const id = nanoid();
  return id;
};
