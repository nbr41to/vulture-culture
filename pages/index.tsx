import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { generateUserId } from 'src/libs/generateUserId';
import { userState } from 'src/recoil/atom';

const Home: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const handleStart = () => {
    if (!user?.name) return alert('⚠️ゲームに使用する名前を決めてください');
    const id = generateUserId();
    setUser({ ...user, id });
    router.push({ pathname: '/entrance', query: { id } });
  };
  return (
    <div>
      <h1>Game Title</h1>
      <input
        type="text"
        placeholder="あなたの名前を入力"
        value={user?.name || ''}
        onChange={(e) => setUser({ ...user, name: e.currentTarget.value })}
        onKeyDown={(e) => {
          if (
            ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) &&
            e.key === 'Enter'
          )
            return handleStart();
        }}
      />
      <button onClick={handleStart}>始める</button>
    </div>
  );
};

export default Home;
