export default function gameNormal() {
  const score = document.querySelector('.SCORE')
  const game = document.querySelector('.GAME')

  let campoGame = [ '', '', '',
                    '', '', '',
                    '', '', '' ]

  const winnerList = [
                      [0, 3, 6], [1, 4, 7], [2, 5, 8],
                      [0, 1, 2], [3, 4, 5], [6, 7, 8],
                      [0, 4, 8], [2, 4, 6]
                      ]

  let players = [{ player: 'X', pontos: 0 }, { player: 'O', pontos: 0 }]
  let win
  let player = players[1]
  score.innerHTML = ` <div><h4 class='s_p1'>${players[0].player} = ${players[0].pontos} pontos.</h4></div>
                      <div><h4 class='s_p2'>${players[1].player} = ${players[1].pontos} pontos.</h4></div>
  `
  const scoreP1 = document.querySelector('.s_p1')
  const scoreP2 = document.querySelector('.s_p2')
  gameStart()

  function gameStart() {
    game.style.gridTemplateColumns = '1fr 1fr 1fr'
    game.style.gridTemplateRows = '1fr 1fr 1fr'
    for (let i = 0; i < campoGame.length; i++) {
      campoGame[i] = ''
    }
    game.innerHTML = ''

    let quadrado = -1
    campoGame.forEach(() => {
      game.innerHTML += `
          <span class='campo campoHover' btn='${++quadrado}'></span>
        `
    })
    vezDoPlayer()
  }

  function vezDoPlayer() {
    const campos = document.querySelectorAll('.campo')

    win = testaSePlayerGanhou()
    win !== true ? playerPodeJogar(campos) : endGameWin(campos)
  }

  function playerPodeJogar(campos) {
    const campo = document.querySelectorAll('.campo')
    campo.forEach(elemento => {
      elemento.addEventListener('click', () => {
        if (win !== true) {
          if (campoGame[elemento.getAttribute('btn')] === '') {
            player === players[0] ? player = players[1] : player = players[0]
            campoGame[elemento.getAttribute('btn')] = player.player
            elemento.innerHTML = campoGame[elemento.getAttribute('btn')]
            const testDraw = campoGame.filter(e => e === '')
            testDraw.length === 0 ? endGameDraw(campos) : vezDoPlayer()
          }
        }
      })
    })
  }

  function refreshGame() {
    game.style.gridTemplateColumns = '1fr'
    game.style.gridTemplateRows = '1fr'
    const reloadGame = document.querySelector('button')
    reloadGame.onclick = () => {
      gameStart()
    }
  }

  function endGameDraw(campos) {
    campos.forEach(campo => campo.className = 'campo campoDraw')
    setTimeout(() => {
      game.innerHTML = `
            <div class='winner'>
              <p><strong>EMPATE!</strong></p>
              <button>JOGAR NOVAMENTE</button>
            </div>
          `
      refreshGame()
    }, 2000)
  }

  function endGameWin(campos) {
    campos.forEach(campo => campo.className="campo")
    setTimeout(() =>{
      game.innerHTML = `
        <div class='winner'>
          <p>JOGADOR <strong>${player.player}</strong> GANHOU!</p>
          <button>JOGAR NOVAMENTE</button>
        </div>
      `
      player.pontos += 1
      player === players[0] ? player = players[1] : player = players[0]
      scoreP1.innerHTML = `${players[0].player} = ${players[0].pontos} pontos.`
      scoreP2.innerHTML = `${players[1].player} = ${players[1].pontos} pontos.`
      refreshGame()
    }, 2000)
  }

  function testaSePlayerGanhou() {

    for (let i = 0; i < winnerList.length; i++) {
      let indicesMarcados = [ winnerList[i][0], winnerList[i][1], winnerList[i][2] ]
      let posicoesMarcadas = indicesMarcados.map(posicao => campoGame[posicao])

      if (posicoesMarcadas.every( marcacao => marcacao === player.player )) {
          // campo.forEach( el => {
          //   el.getAttribute('btn')
          // })
          indicesMarcados.forEach(posicao => {
            const btn = document.querySelector(`[btn="${posicao}"]`)
            btn.style.backgroundColor = "#ec9c07"
          })
        return true
      }
    }
  }
}