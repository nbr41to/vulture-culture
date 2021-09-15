import { Room } from 'types';
import { translatePlayersArray } from '../translatePlayersArray';

/* 場のカードを判定し勝者にポイントを付与 */
export const judge = (
  room: Room,
): {
  room: Room;
  result: { winner: string; field: { name: string; number: number }[] };
} => {
  const newRoom = { ...room };
  let result: { winner: string; field: { name: string; number: number }[] };
  const score = newRoom.deck.splice(0, 1)[0];
  const fieldCards = newRoom.field;
  const fieldNumbers = fieldCards.map((card) => card.number);
  /* 重複を除いた場の数字の配列 */
  const numbers = fieldNumbers.filter(
    (n) => fieldCards.filter((card) => card.number === n).length === 1,
  );
  if (!numbers.length) {
    /* 重複しない場の数字がない場合 */
    newRoom.status = {
      phase: 'select',
      playerId: translatePlayersArray(room.players)[
        Math.random() * translatePlayersArray(room.players).length
      ].id,
    };
    newRoom.field = [];
    result = {
      winner: 'なし',
      field: fieldCards.map((card) => ({
        name: room.players[card.playerId].name,
        number: card.number,
      })),
    };
  }
  /* 最大値の算出 */
  const max = numbers?.reduce((a, b) => Math.max(a, b));
  const win = fieldCards.find((card) => card.number === max);
  newRoom.players[win.playerId].score =
    newRoom.players[win.playerId].score + score;
  newRoom.status = { phase: 'select', playerId: win.playerId };
  newRoom.field = [];
  result = {
    winner: room.players[win.playerId].name,
    field: fieldCards.map((card) => ({
      name: room.players[card.playerId].name,
      number: card.number,
    })),
  };
  return { room: newRoom, result };
};
