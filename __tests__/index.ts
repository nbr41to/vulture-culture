import { setGame } from 'src/libs/game';
import { initialRoom } from './initialRoom';

describe('ゲームスタート', () => {
  test('ゲームスタート ', () => {
    const game = setGame(initialRoom);
    console.log(game);
    expect(setGame(initialRoom)).toEqual(game);
  });
});

export {};
