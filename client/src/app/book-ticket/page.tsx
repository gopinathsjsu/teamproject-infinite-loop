import type { AppProps } from 'next/app'

import '../styles/globals.scss'
import MoviesContext from './context/MoviesContext'
import { useState } from 'react';
import { Movie } from '@/src/lib/types';
import { movies as mockMovies } from './sampleData';



//important note. Remove the context after getting api to get the data. 
function Home({
    children,
}: {
    children: React.ReactNode
}) {
    const [movies, setMovies] = useState<Movie[]>(mockMovies);
    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
            {children}
        </MoviesContext.Provider>
    )
}

export default Home;