import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

import "../styles/sidebar.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SidebarProps {
  selectedGenreId: number;
  handleClickButton: Function;
  setSelectedTitle: Function;
}

export function SideBar(props: SidebarProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${props.selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
        props.setSelectedTitle(response.data.title);
      });
  }, [props.selectedGenreId]);

  return (
    <>
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.handleClickButton(genre.id, genre.title)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
