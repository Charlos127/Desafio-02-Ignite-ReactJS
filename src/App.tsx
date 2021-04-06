import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(1);
  const [selectedTitle, setSelectedTitle] = useState("");

  function handleClickButton(id: number, title: string) {
    setSelectedGenreId(id);
    setSelectedTitle(title);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
        setSelectedTitle={setSelectedTitle}
      />

      <div className="container">
        <Content selectedGenreId={selectedGenreId} title={selectedTitle} />
      </div>
    </div>
  );
}
