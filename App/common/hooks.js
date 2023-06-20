import {useEffect, useState} from 'react';
import functions from '@react-native-firebase/functions';
// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:5001');
// }
export function useUserVerificationDetails(token) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('unknown');

  const [userDetails, setDetails] = useState(false);
  useEffect(() => {
    if (token) {
      functions()
        .httpsCallable('getBerbixTransaction')({
          refreshToken: token,
        })
        .then((response) => {
          setLoading(false);
          const data = response.data;
          setDetails(data);
          if (data?.action === '') {
            setStatus('pending');
          } else if (data?.action) {
            setStatus(data?.action);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }

  }, [token]);
  return {loading, status, userDetails};
}
