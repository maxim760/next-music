import { Button } from "@material-ui/core";
import React from "react";
import AppNavbar from "../components/AppNavbar";
import { MainLayout } from "../components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="center">
        <h1>Добро пожаловать!</h1>
        <h3>Здесь собраны лучшие треки!</h3>
      </div>
      <style jsx>{`
          .center {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            margin-top:150px;
            flex-direction: column;
          }
          .center h1 {
            margin-bottom: 30px;
          }
    `}</style>
    </MainLayout>
  );
}
