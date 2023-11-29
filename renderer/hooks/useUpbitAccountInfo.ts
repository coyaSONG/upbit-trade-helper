import React, { useState, useEffect } from "react";
import axios from "axios";

const useUpbitAccountInfo = (currency = "KRW") => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        const response = await axios.get("/api/account");

        const account = response.data.find((acc) => acc.currency === currency);
        if (account) {
          setBalance(account.balance);
        } else {
          setBalance(null);
        }
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    getAccountInfo();
  }, [currency]);

  return { balance, error };
};

export default useUpbitAccountInfo;
