import { Room } from 'types';
import { shuffle } from '../shuffle';
import { translatePlayersArray } from '../translatePlayersArray';

/* スコアカードの作成 */
const createScoreCards = () => {
  const cards: number[] = [];
  for (let i = 0; i < 16; i++) {
    cards.push(i - 5);
  }
  return cards.filter((card) => card !== 0);
};

/* プレイヤーカードの作成 */
const createPlayerCards = () => {
  const cards: number[] = [];
  for (let i = 1; i < 16; i++) {
    cards.push(i);
  }
  return cards;
};

/* ゲームスタート or リセット */
export const setGame = (room: Room): Room => {
  const newRoom = { ...room };
  const players = shuffle(translatePlayersArray(room.players));
  newRoom.deck = shuffle(createScoreCards());
  players.forEach((player, index) => {
    newRoom.players[player.id].next = players[(index + 1) % players.length].id;
    newRoom.players[player.id].hands = createPlayerCards();
    newRoom.players[player.id].score = 0;
    newRoom.players[player.id].isReady = false;
  });
  newRoom.status = { phase: 'select', playerId: players[0].id };
  newRoom.field = [];
  return newRoom;
};
