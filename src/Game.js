import React from 'react'
import styled from 'styled-components';

const casas = [
  { "checked": false, "position": 'A', 'player': '' },
  { "checked": false, "position": 'B', 'player': '' },
  { "checked": false, "position": 'C', 'player': '' },
  { "checked": false, "position": 'D', 'player': '' },
  { "checked": false, "position": 'E', 'player': '' },
  { "checked": false, "position": 'F', 'player': '' },
  { "checked": false, "position": 'G', 'player': '' },
  { "checked": false, "position": 'H', 'player': '' },
  { "checked": false, "position": 'J', 'player': '' },

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
`

const Cel = styled.div`
  border: 1px solid #ccc;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Game = () => {

  const [checked, setChecked] = React.useState(casas);
  const [player, setPlayer] = React.useState(0);
  const [winner, setWinner] = React.useState({});

  const handleClick = ({ target }) => {

    checked.map((check, index) => {
      // Se a casa ainda não foi preenchida
      if (check.position === target.getAttribute('id')) {
        if (casas[index].checked === false) {
          casas[index].checked = true
          player % 2 === 0 || player === 0 ? casas[index].player = 'X' : casas[index].player = 'O'

          // Checa as combinações possíveis e seta o vencedor
          indexCombination.forEach(combination => {
            return checked[combination[0]].player !== '' && checked[combination[0]].player === checked[combination[1]].player && checked[combination[1]].player === checked[combination[2]].player ? setWinner({ "winner": true, "player": checked[combination[1]].player, "combination": [combination[0], combination[1], combination[2]] }) : '';
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

  // if (winner.winner) return <div>Temos um vencedor! Saudações ao novo imperador: {winner.player}</div>

  return (
    <>
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