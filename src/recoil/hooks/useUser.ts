import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getUser } from 'src/firebase/firestore';
import { userState } from 'src/recoil/atom';
import { User } from 'types';

export const useUser = (): User => {
  const router = useRouter();
  const roomId = router.asPath.split('/')[1].split('?')[0];
  const userId = router.query?.id as string;

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log('useUser', roomId, userId);
    if (user) return;
    getUser({ userId, roomId }).then((res) => {
      setUser(res);
    });
  }, [userId]);

  return user;
};
