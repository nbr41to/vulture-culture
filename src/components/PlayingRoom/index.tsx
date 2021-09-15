import { VFC } from 'react';
import { readyCheck } from 'src/firebase/firestore';
import { setGame } from 'src/libs/game';
import { useRoom } from 'src/recoil/hooks/useRoom';
import { useUser } from 'src/recoil/hooks/useUser';
import styled from 'styled-components';
import { translatePlayersArray } from '../../libs/translatePlayersArray';
import { writeRoomState } from 'src/firebase/firestore';
import { GameBoard } from './GameBoard';

type PlayingRoomProps = {
  className?: string;
};

export const PlayingRoom: VFC<PlayingRoomProps> = ({ className }) => {
  const user = useUser();
  const room = useRoom();

  const gameStartHandler = async () => {
    const changedRoom = setGame(room);
    await writeRoomState(changedRoom);
  };
  const readyCheckHandler = async () => {
    await readyCheck({ roomId: room.id, playerId: user.id });
  };

  if (room) {
    const players = translatePlayersArray(room.players);
    const allReady = players.length === players.filter((p) => p.isReady).length;
    const isHost = room.hostId === user.id;

    return (
      <StyledPlayingRoom className={`${className}`}>
        <h3>招待コード: {room.inviteCode}</h3>
        <h3>部屋の人</h3>
        {players.map((player) => (
          <div key={player.id}>{player.name}</div>
        ))}
        {isHost ? (
          <button onClick={gameStartHandler} disabled={allReady}>
            START
          </button>
        ) : (
          <button onClick={readyCheckHandler}>READY</button>
        )}
        <div>-----------------------</div>
        {room.status.phase !== 'not started' && (
          <GameBoard room={room} user={user} />
        )}
      </StyledPlayingRoom>
    );
  }
  return <>...loading</>;
};

const StyledPlayingRoom = styled.div``;
