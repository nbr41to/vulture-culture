import { useRouter } from 'next/router';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { createRoom } from 'src/firebase/firestore';
import { userState } from 'src/recoil/atom';
import styled from 'styled-components';

type EntranceProps = {
  className?: string;
};

export const Entrance: VFC<EntranceProps> = ({ className }) => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const createRoomHandler = async () => {
    const roomId = await createRoom({ playerId: user.id, name: user.name });
    router.push({ pathname: `/${roomId}`, query: { id: user.id } });
  };
  const joinRoomHandler = () => {};

  return (
    <StyledEntrance className={`${className}`}>
      <button onClick={createRoomHandler}>部屋を作る</button>
      <br />
      <input placeholder="7桁の招待コード" type="text" />
      <button onClick={joinRoomHandler}>部屋に入る</button>
    </StyledEntrance>
  );
};

const StyledEntrance = styled.div``;
