import React from "react";
import { Movie } from "@/src/lib/types";
import { movies } from "../sampleData";

export default React.createContext<MovieContextModal>({ movies: movies });

interface MovieContextModal {
  movies: Movie[],
  setMovies?: Function
}