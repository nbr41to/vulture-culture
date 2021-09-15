export type User = {
  id: string;
  name: string;
};

export type Phase = 'not started' | 'select' | 'wait';
export type Player = {
  id?: string;
  name: string;
  hands: number[];
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
  deck: number[]; // 山札
  field: { playerId: string; number: number }[]; // 場
  /* ゲームの状態 */
  status: { phase: Phase; playerId: string };
};
