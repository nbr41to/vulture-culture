import { Room } from 'types';

/* 場のカードを判定し勝者にポイントを付与 */
export const judge = (room: Room): Room => {
  const newRoom = { ...room };
  const score = newRoom.deck.splice(0, 1)[0];
  const fieldCards = newRoom.field;
  const fieldNumbers = fieldCards.map((card) => card.number);
  const max = fieldNumbers
    .filter((n) => fieldCards.filter((card) => card.number === n).length === 1)
    .reduce((a, b) => Math.max(a, b));
  const win = fieldCards.find((card) => card.number === max);
  newRoom.players[win.playerId].score =
    newRoom.players[win.playerId].score + score;
  newRoom.status = { phase: 'select', playerId: win.playerId };
  return newRoom;
};
