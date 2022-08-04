import React from 'react'
import styled from 'styled-components';

const casas = [
  { "checked": false, "position": 'A', 'player': '', 'name': '' },
  { "checked": false, "position": 'B', 'player': '', 'name': '' },
  { "checked": false, "position": 'C', 'player': '', 'name': '' },
  { "checked": false, "position": 'D', 'player': '', 'name': '' },
  { "checked": false, "position": 'E', 'player': '', 'name': '' },
  { "checked": false, "position": 'F', 'player': '', 'name': '' },
  { "checked": false, "position": 'G', 'player': '', 'name': '' },
  { "checked": false, "position": 'H', 'player': '', 'name': '' },
  { "checked": false, "position": 'J', 'player': '', 'name': '' },

]

// As combinações possĩveis para o vencedor
const indexCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [2, 5, 8]
]

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  max-width: 9rem;
  margin-top: 4rem;
`

const Cel = styled.div`
  border: 1px solid #ccc;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Game = ({ jogador1, jogador2 }) => {

  const [checked, setChecked] = React.useState(casas);
  const [player, setPlayer] = React.useState(0);
  const [winner, setWinner] = React.useState({});

  const handleClick = ({ target }) => {

    checked.map((check, index) => {
      // Se a casa ainda não foi preenchida
      if (check.position === target.getAttribute('id')) {
        if (casas[index].checked === false) {
          casas[index].checked = true

          if(player % 2 === 0 || player === 0) {
            casas[index].player = 'X';
            casas[index].name = jogador1;

          } else {
            casas[index].player = 'O'
            casas[index].name = jogador2;
          }

          // Checa as combinações possíveis e seta o vencedor
          indexCombination.forEach(combination => {
            return checked[combination[0]].player !== '' && checked[combination[0]].player === checked[combination[1]].player && checked[combination[1]].player === checked[combination[2]].player ? setWinner({ "winner": true, "player": checked[combination[1]].name, "combination": [combination[0], combination[1], combination[2]] }) : '';
          });

          setChecked([...casas])
        }
      }
    })

    setPlayer(player + 1);
  }

  const startNewGame = () => {
    if(window.confirm('Deseja iniciar um novo jogo?') === true) {
      window.location.reload();
    }

  }

  return (
    <>
      <h1>{jogador1} Vs {jogador2}</h1>
      {winner.winner && <div>Temos um vencedor! Saudações ao novo imperador: {winner.player}</div>}
      <Grid>
        {
          casas.map((casa, index) => {
            let styles = {};
            if (winner.winner) {
              if (winner.combination.includes(index)) {
                styles = { background: '#D3EBCD', textDecoration: 'underline', border: '1px solid #2B7A0B', color: '#1A4D2E', fontWeight: 'bold' }
              }
            }
            return (
              <Cel style={styles} key={casa.position} onClick={!winner.winner ? handleClick : startNewGame} id={casa.position}>
                {
                  casa.player
                }
              </Cel>
            )
          })
        }
      </Grid>
    </>
  )
}

export default Game