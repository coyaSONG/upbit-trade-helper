import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import useUpbitAccountInfo from "@hooks/useUpbitAccountInfo";
import axios from "axios";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");
  useUpbitAccountInfo();

  React.useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined" && window.require) {
      const electron = window.require("electron");
      const ipcRenderer = electron.ipcRenderer;

      // 메인 프로세스로부터 메시지 수신
      ipcRenderer.on("tradingview-message", (event, receivedMessage) => {
        setMessage(receivedMessage);
      });

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        ipcRenderer.removeAllListeners("tradingview-message");
      };
    }
  }, []);

  async function handleClickMarketList() {
    const list = await axios.get("http://localhost:8888/api/market-list");
    console.log("list", list);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width="256px"
          height="256px"
        />
      </div>
      <div>
        <button
          onClick={() => {
            handleClickMarketList();
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
}
