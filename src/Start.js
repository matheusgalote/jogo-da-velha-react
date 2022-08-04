import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Game from './Game';

const Start = () => {
  const [init, setInit] = React.useState(null);
  const [jogador1, setJogador1] = React.useState('');
  const [jogador2, setJogador2] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if(jogador1 && jogador2) {
      setInit(true);
    }
  }

  return (
    <>{ !init &&
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <label htmlFor='jogador1'>Jogador 1</label>
        <input type='text' id='jogador1' name='jogador1' onChange={({ target }) => setJogador1(target.value) } value={jogador1} />
        <label htmlFor='jogador2'>Jogador 2</label>
        <input type='text' id='jogador2' name='jogador2' onChange={({ target }) => setJogador2(target.value)} value={jogador2} />
        <button type='submit'>Começar</button>
      </form>
      }
      <div>
        {init &&
          <Routes>
            <Route path='/' element={<Game jogador1={jogador1} jogador2={jogador2} />} />
          </Routes>
        }
      </div>
    </>
  )
}

export default Start