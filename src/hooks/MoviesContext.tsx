import { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface IProviderProps {
  children: ReactNode;
}
interface IContextData {
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  selectedGenreId: number;
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
}

const MoviesContext = createContext<IContextData>({} as IContextData)

export function MoviesProvider({ children }: IProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    console.log(selectedGenreId)
  }
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        selectedGenre,
        movies,
        selectedGenreId,
        genres,
        handleClickButton
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovie() {
  const context = useContext(MoviesContext)

  return context;
}