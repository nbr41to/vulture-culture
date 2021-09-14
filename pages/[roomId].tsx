import { NextPage } from 'next';
import styled from 'styled-components';

type PlayingRoomPageProps = {
  className?: string;
};

const PlayingRoomPage: NextPage<PlayingRoomPageProps> = ({ className }) => {
  return (
    <StyledPlayingRoomPage className={`${className}`}>
      <h1>PlayingRoom</h1>
    </StyledPlayingRoomPage>
  );
};

const StyledPlayingRoomPage = styled.div``;

export default PlayingRoomPage;
