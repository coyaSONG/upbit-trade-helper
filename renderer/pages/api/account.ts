import { NextApiRequest, NextApiResponse } from "next";
import useApiConfig from "@hooks/useApiConfig";
import axios from "axios";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { createToken } = useApiConfig();

  const options = {
    method: "GET",
    url: "https://api.upbit.com/v1/accounts",
    headers: { accept: "application/json", Authorization: createToken() },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
