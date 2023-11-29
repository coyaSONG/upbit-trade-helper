import axios, { AxiosResponse } from "axios";

interface Account {
  currency: string;
  balance: string;
  locked: string;
  avg_buy_price: string;
  avg_buy_price_modified: boolean;
  unit_currency: string;
}

export const getUpbitAccountInfo = async (
  currency: string = "KRW"
): Promise<string | null> => {
  try {
    const response: AxiosResponse<Account[]> = await axios.get(
      "http://localhost:8888/api/account"
    );
    console.log("response", response);
    const account: Account | undefined = response.data.find(
      (acc: Account) => acc.currency === currency
    );
    return account ? account.balance : null;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
