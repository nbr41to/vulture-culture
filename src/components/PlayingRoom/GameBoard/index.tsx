import { useState, VFC, useEffect } from 'react';
import { writeRoomState } from 'src/firebase/firestore';
import { judge, selectCard } from 'src/libs/game';
import styled from 'styled-components';
import { Room, User } from 'types';
import { translatePlayersArray } from '../../../libs/translatePlayersArray';

type GameBoardProps = {
  className?: string;
  room: Room;
  user: User;
};

export const GameBoard: VFC<GameBoardProps> = ({ className, room, user }) => {
  const [result, setResult] =
    useState<{ winner: string; field: { name: string; number: number }[] }>(
      null,
    );
  const players = translatePlayersArray(room.players);
  const yourTurn = room.status.playerId === user.id;
  const selectCardHandler = async (number: number) => {
    const changedRoom = selectCard({ room, playerId: user.id, number: number });
    console.log(changedRoom);
    await writeRoomState(changedRoom);
  };
  const selected = (playerId: string) =>
    room.field.map((card) => card.playerId).includes(playerId);
  const allSelected =
    room.field.length === translatePlayersArray(room.players).length;
  const judgeHandler = async () => {
    const { room: changedRoom, result } = judge(room);
    await writeRoomState(changedRoom);
    setResult(result);
  };

  useEffect(() => {
    if (allSelected) {
      judgeHandler();
    }
  }, [allSelected]);

  return (
    <StyledGameBoard className={`${className}`}>
      <h3>target ▶ {room.deck[0]}</h3>
      {result && (
        <div>
          <h3>今回の結果</h3>
          <p>勝者: {result.winner}</p>
          {result.field.map((card, index) => (
            <p key={index}>
              {card.number}: {card.name}
            </p>
          ))}
          <button>👍</button>
          <button>👎</button>
        </div>
      )}
      {players.map((player) => (
        <div key={player.id}>
          <p>
            {selected(player.id) ? '✅' : '💬'} {player.score}P: {player.name}
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
