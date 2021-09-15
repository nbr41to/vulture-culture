import { VFC } from 'react';
import { writeRoomState } from 'src/firebase/firestore';
import { selectCard } from 'src/libs/game';
import styled from 'styled-components';
import { Room, User } from 'types';
import { translatePlayersArray } from '../../../libs/translatePlayersArray';

type GameBoardProps = {
  className?: string;
  room: Room;
  user: User;
};

export const GameBoard: VFC<GameBoardProps> = ({ className, room, user }) => {
  const players = translatePlayersArray(room.players);
  const yourTurn = room.status.playerId === user.id;
  const selectCardHandler = async (number: number) => {
    const changedRoom = selectCard({ room, playerId: user.id, number: number });
    console.log(changedRoom);
    // await writeRoomState(changedRoom);
  };
  return (
    <StyledGameBoard className={`${className}`}>
      <h3>target ▶ {room.deck[0]}</h3>
      {players.map((player) => (
        <div key={player.id}>
          <p>
            {player.score}P: {player.name}
          </p>
          {player.hands.map((n) => (
            <span key={n}>{n}, </span>
          ))}
        </div>
      ))}
      <h3>カードを選択</h3>
      <p>{yourTurn ? 'カードを選択してください' : '待機中...'}</p>
      {room.players[user.id].hands.map((n) => (
        <button
          key={n}
          disabled={!yourTurn}
          onClick={() => selectCardHandler(n)}
        >
          {n}
        </button>
      ))}
    </StyledGameBoard>
  );
};

const StyledGameBoard = styled.div``;
