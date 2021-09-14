import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from 'src/firebase/config';
import { Room } from 'types';

export const useRoom = (): Room => {
  const router = useRouter();
  const roomId = router.asPath.split('/')[1].split('?')[0];

  const [room, setRoom] = useState<Room>(null);

  useEffect(() => {
    if (roomId === '[roomId]') return;
    // console.log('useRoom', roomId);

    const unsubscribe = onSnapshot(doc(db, 'rooms', roomId), (doc) => {
      const data = doc.data() as Room;
      setRoom(data);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);

  return room;
};
