import { useState, useEffect } from 'react'
import { api } from '../services/api'

import { Button } from './Button'

import '../styles/sidebar.scss';
import { useMovie } from '../hooks/MoviesContext';


export function SideBar() {
  // Complete aqui
  const { genres, handleClickButton, selectedGenreId } = useMovie();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}