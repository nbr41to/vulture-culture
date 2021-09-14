import { Room } from 'types';

/* ゲーム中にRoomを書き換える関数 */

/* ゲームスタート or リセット */
export const setGame = (room: Room): Room => {
  const newRoom = { ...room };
  /* 変更内容 */
  return newRoom;
};
