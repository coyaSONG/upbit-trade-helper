import { useEffect } from 'react';
import axios from 'axios';

const useUpbitAccountInfo = () => {
  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        const response = await axios.get('/api/account');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAccountInfo();
  }, []);
};

export default useUpbitAccountInfo;