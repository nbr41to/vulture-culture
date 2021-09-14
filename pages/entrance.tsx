import { NextPage } from 'next';
import { Entrance } from 'src/components/Entrance';
import styled from 'styled-components';

type EntrancePageProps = {
  className?: string;
};

const EntrancePage: NextPage<EntrancePageProps> = ({ className }) => {
  return (
    <StyledEntrancePage className={`${className}`}>
      <h1>Entrance</h1>
      <Entrance />
    </StyledEntrancePage>
  );
};

const StyledEntrancePage = styled.div``;

export default EntrancePage;
