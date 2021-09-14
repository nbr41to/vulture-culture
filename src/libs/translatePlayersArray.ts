import { Player } from 'types';

export const translatePlayersArray = (players: {
  [playerId: string]: Player;
}): Player[] => {
  const playerIds = Object.keys(players);
  const newArray = Object.values(players).map((player, index) => {
    player.id = playerIds[index];
    return player;
  });
  return newArray;
};
