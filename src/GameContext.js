import React from 'react'

export const GameContext = React.createContext();

export const GameStorage = ({ children }) => {

  const [start, setStart] = React.useState(null);

  return (
    <GameContext.Provider>
      {children}
    </GameContext.Provider>
  )
}
