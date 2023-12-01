import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import querystring from "querystring";

// This should be a server-side utility function, not a React hook.
export const getApiConfig = () => {
  const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
  const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
  const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

  // This function should be called with the query parameters you want to sign.
  const createToken = (query) => {
    const queryHash = crypto
      .createHash("sha512")
      .update(querystring.encode(query), "utf-8")
      .digest("hex");

    const payload = {
      access_key: access_key,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: "SHA512",
    };

    return jwt.sign(payload, secret_key);
  };

  return { server_url, createToken };
};

export default getApiConfig;
