import firebase from 'firebase';
import {useCallback, useMemo} from 'react';
import useAuth from './useAuth';
import useFeedback from './useFeedback';

const useFirebase = () => {
  const {isAuthenticated, user} = useAuth();
  const {feedback} = useFeedback();

  const firebaseInstance = useMemo(() => {
    if (firebase.apps.length) return firebase.app();

    return firebase.initializeApp({
      apiKey: 'AIzaSyAw3mXrTIImWrJHB5Ng67I2yV2jykAvQ2g',
      authDomain: 'me-musicando.firebaseapp.com',
      projectId: 'me-musicando',
      storageBucket: 'me-musicando.appspot.com',
      messagingSenderId: '1046879507103',
      appId: '1:1046879507103:web:23b8db457cea63a3b788aa',
      measurementId: 'G-SKYL4YHWHD',
    });
  }, []);

  const handleUpdateEventCover = useCallback(
    (
      id: string,
      data: {
        file: Blob | Uint8Array | ArrayBuffer;
        metadata: firebase.storage.SettableMetadata;
      },
    ) => {
      if (!isAuthenticated) throw Error('You area not authenticated.');
      if (!/(?:\/)(.+)/.test(data.metadata.contentType ?? '')) {
        //TODO(Jeconias): Solve it.
        feedback({
          message: 'Ops! o tipo de imagem deve ser JPEG',
          type: 'warning',
        });
      } else {
        return firebaseInstance
          .storage()
          .ref('users')
          .child(user?.uuid ?? '')
          .child('events')
          .child(id)
          .child('cover.jpeg')
          .put(data.file, data.metadata)
          .catch((e) => {
            feedback({
              message: 'Ops! Tivemos um erro ao salvar a imagem',
              type: 'danger',
            });
            return Promise.reject(e);
          });
      }
    },
    [isAuthenticated, user, firebaseInstance, feedback],
  );

  const handleGetEventCover = useCallback(
    (id: string) => {
      return firebaseInstance
        .storage()
        .ref('users')
        .child(user?.uuid ?? '')
        .child('events')
        .child(id)
        .child('cover.jpeg')
        .getDownloadURL()
        .catch((e) => {
          //TODO(Jeconias): Solve it.
          console.log(e);
        });
    },
    [firebaseInstance, user],
  );

  return {
    firebase: firebaseInstance,
    event: {
      updateCover: handleUpdateEventCover,
      getCover: handleGetEventCover,
    },
  };
};

export default useFirebase;
