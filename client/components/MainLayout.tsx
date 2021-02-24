import React from "react";
import Head from "next/head";
import AppNavbar from "./AppNavbar";
import { Container } from "@material-ui/core";
import { Player } from "./Player";

export const MainLayout = ({
  title = "Главная",
  children,
  isNav = true,
  keywords = "",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="keywords"
          content={`next,react,js,nextjs,server,music,tracks,album${
            keywords && "," + keywords
          }`}
        />
        <meta
          name="description"
          content="Описание, Это приложение на основе next js, Работает быстро, оптимизировано, также кроссплатформенность и кроссбраузерность поддерживаются, с информацией о пользователях"
        />
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta charSet={"utf-8"} />
      </Head>
      {isNav && <AppNavbar />}
      <Container>
        <main className="main">{children}</main>
      </Container>
      <Player />
      <style jsx>{`
        .main {
          padding-top: 64px !important;
          padding-bottom: 64px !important;
        }
      `}</style>
    </>
  );
};
