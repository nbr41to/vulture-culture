import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { generateInviteCode } from 'src/libs/generateInviteCode';
import { Room, User } from 'types';

import { db } from './config';

const roomRef = collection(db, 'rooms');
/* roomIdを指定しない場合はReferenceを作成して返す */
const roomDoc = (roomId?: string) => {
  if (roomId) {
    return doc(roomRef, roomId);
  }
  return doc(roomRef);
};

/* 新しい部屋の作成 */
export const createRoom = async (input: {
  playerId: string;
  name: string;
}): Promise<string> => {
  const { playerId, name } = input;

  const newRoomRef = roomDoc();
  const inviteCode = generateInviteCode();
  const initialRoomState: Room = {
    id: newRoomRef.id,
    inviteCode,
    hostId: playerId,
    players: {
      [playerId]: {
        name,
        isReady: false,
        hands: [],
        score: 0,
        next: '',
      },
    },
    deck: [],
    status: { phase: 'not started', playerId: '' },
  };

  await setDoc(newRoomRef, initialRoomState);
  return newRoomRef.id;
};

/* 部屋に入る*/
export const joinRoom = async (input: {
  inviteCode: string;
  playerId: string;
  name: string;
}): Promise<string> => {
  const { playerId, name, inviteCode } = input;
  const matchRoomRef = query(roomRef, where('inviteCode', '==', inviteCode));

  if (!matchRoomRef) throw new Error('not founded room');

  const snapshot = await getDocs(matchRoomRef);
  const roomId = snapshot.docs[0].id;
  await updateDoc(roomDoc(roomId), {
    [`players.${playerId}`]: {
      name,
      isReady: false,
      hands: [],
      score: 0,
      next: '',
    },
  });
  return roomId;
};

/* ReadyCheck */
export const readyCheck = async (input: {
  playerId: string;
  roomId: string;
}): Promise<void> => {
  const { playerId, roomId } = input;
  await updateDoc(roomDoc(roomId), {
    [`players.${playerId}.isReady`]: true,
  });
};

/* room情報を書き換え */
export const writeRoomState = async (room: Room): Promise<void> => {
  await setDoc(roomDoc(room.id), room);
};

/* roomIdとuserIdからuser情報を取得 */
export const getUser = async (input: {
  userId: string;
  roomId: string;
}): Promise<User> => {
  const { userId, roomId } = input;
  if (!userId || !roomId) return;
  const doc = await getDoc(roomDoc(roomId));
  const room = doc.data() as Room;
  const user = {
    id: userId,
    name: room.players[userId].name,
  };
  return user;
};
