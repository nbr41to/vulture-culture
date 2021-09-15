import { Room } from 'types';

/* 場に出すカードを選択する */
export const selectCard = (params: {
  room: Room;
  playerId: string;
  number: number;
}): Room => {
  const { room, playerId, number } = params;
  const newRoom = { ...room };
  newRoom.players[playerId].hands.splice(number - 1, 1);
  newRoom.field.push({ playerId, number });
  newRoom.status = {
    phase: 'select',
    playerId: newRoom.players[playerId].next,
  };
  return newRoom;
};
