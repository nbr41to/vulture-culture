import { Room } from 'types';

export const initialRoom: Room = {
  id: 'test-room-id',
  inviteCode: 'invite-code',
  hostId: 'test-player1',
  players: {
    ['test-player1']: {
      name: '太郎',
      isReady: false,
      hands: [],
      score: 0,
      next: '',
    },
    ['test-player2']: {
      name: '桃子',
      isReady: false,
      hands: [],
      score: 0,
      next: '',
    },
    ['test-player3']: {
      name: '卍鬼卍',
      isReady: false,
      hands: [],
      score: 0,
      next: '',
    },
    ['test-player4']: {
      name: '洗濯ばばぁ',
      isReady: false,
      hands: [],
      score: 0,
      next: '',
    },
  },
  deck: [],
  field: [],
  status: { phase: 'not started', playerId: '' },
};
