import { NextPage } from 'next';
import { PlayingRoom } from 'src/components/PlayingRoom';
import styled from 'styled-components';

type PlayingRoomPageProps = {
  className?: string;
};

const PlayingRoomPage: NextPage<PlayingRoomPageProps> = ({ className }) => {
  return (
    <StyledPlayingRoomPage className={`${className}`}>
      <h1>PlayingRoom</h1>
      <PlayingRoom />
    </StyledPlayingRoomPage>
  );
};

const StyledPlayingRoomPage = styled.div``;

export default PlayingRoomPage;
