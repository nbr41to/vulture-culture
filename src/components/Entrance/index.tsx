import { useRouter } from 'next/router';
import { VFC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { createRoom, joinRoom } from 'src/firebase/firestore';
import { userState } from 'src/recoil/atom';
import styled from 'styled-components';

type EntranceProps = {
  className?: string;
};

export const Entrance: VFC<EntranceProps> = ({ className }) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [inviteCode, setInviteCode] = useState('');

  const createRoomHandler = async () => {
    try {
      const roomId = await createRoom({ playerId: user.id, name: user.name });
      router.push({ pathname: `/${roomId}`, query: { id: user.id } });
    } catch (error) {
      alert('エラーが発生しました');
    }
  };
  const joinRoomHandler = async () => {
    try {
      const roomId = await joinRoom({
        inviteCode,
        playerId: user.id,
        name: user.name,
      });
      router.push({ pathname: `/${roomId}`, query: { id: user.id } });
    } catch (error) {
      alert('エラーが発生しました');
    }
  };

  useEffect(() => {
    if (!user) router.push('/');
  }, [user]);

  return (
    <StyledEntrance className={`${className}`}>
      <label htmlFor="name">なまえ：</label>
      <input
        id="name"
        type="text"
        placeholder="あなたの名前を入力"
        value={user?.name || ''}
        onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
      />
      <br />
      <button onClick={createRoomHandler}>部屋を作る</button>
      <br />
      <input
        placeholder="7桁の招待コード"
        type="text"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.currentTarget.value)}
      />
      <button onClick={joinRoomHandler}>部屋に入る</button>
    </StyledEntrance>
  );
};

const StyledEntrance = styled.div``;
