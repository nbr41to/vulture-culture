export type User = {
  id: string;
  name: string;
};

export type Phase = 'not started' | 'waiting' | 'playing';
export type Player = {
  id?: string;
  name: string;
  hands: [];
  isReady: boolean;
  score: number;
  next: string;
};

export type Room = {
  id: string;
  inviteCode: string; // 招待コード
  hostId: string; // ホストのID
  /* プレイヤーの状態 */
  players: {
    [playerId: string]: Player;
  };
  deck: []; // 山札
  /* ゲームの状態 */
  status: { phase: Phase; playerId: string };
};
