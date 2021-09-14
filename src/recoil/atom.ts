import { atom } from 'recoil';
import { Room, User } from 'types';

export const userState = atom<User>({
  key: 'userState',
  default: null,
});

export const roomState = atom<Room>({
  key: 'roomState',
  default: null,
});
