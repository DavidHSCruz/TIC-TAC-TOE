export default function gameAvancado() {
  const score = document.querySelector('.SCORE')
  const game = document.querySelector('.GAME')

  let campoGame
  let players = [{ player: 'X', pontos: 0 }, { player: 'O', pontos: 0 }]
  let player = players[0]
  score.innerHTML = ` <div><h4 class='s_p1'>${players[0].player} = ${players[0].pontos} pontos.</h4></div>
                        <div><h4 class='s_p2'>${players[1].player} = ${players[1].pontos} pontos.</h4></div>
    `
  gameStart()

  function gameStart() {
    campoGame = [
                  ['', '', ''],
                  ['', '', ''],
                  ['', '', ''],
                 ]

    criaCampo()
    let playerWin = false
    adicionaClick(playerWin)
  }

  function criaCampo() {
    game.innerHTML = ''
    let i = 0
    for (let x = 0; x < campoGame.length; x++) {
      campoGame[x].forEach(elemento => {
        game.innerHTML += `
                    <span class='campo' linha='${x}' coluna='${i}'>${elemento}</span>
                  `
        i < campoGame[0].length - 1 ? i++ : i = 0
      })
    }
    let colunasGrid = ''
    let linhasGrid = ''
    game.style.gridTemplateColumns = ''
    game.style.gridTemplateRows = ''
    campoGame[0].forEach(() => {
      colunasGrid += '1fr '
      game.style.gridTemplateColumns = colunasGrid
    })
    campoGame.forEach(() => {
      linhasGrid += '1fr '
      game.style.gridTemplateRows = linhasGrid
    })
  }
  
  function adicionaClick(playerWin) {
    const campo = document.querySelectorAll('.campo')
    campo.forEach(elemento => {
      elemento.addEventListener('click', el => {
        !playerWin ? playerPodeJogar(playerWin, el) : null
        playerWin = playerWinTest(playerWin)
        player === players[0] ? player = players[1] : player = players[0]
        testValorCampo() ? criaNovoCampo(el, playerWin) : null
      })
    })
  }

  function criaNovoCampo(e, playerWin) {
    const linhaBloco = parseInt(e.target.getAttribute('linha'))
    const colunaBloco = parseInt(e.target.getAttribute('coluna'))
    const bloco = document.querySelector(`[linha='${linhaBloco}'][coluna='${colunaBloco}']`)
    tiraValoresCampo(linhaBloco, colunaBloco, e)

    if (linhaBloco <= 2 && colunaBloco === 0) {
      for (let linha = 0; linha < campoGame.length; linha++) {
        campoGame[linha].push('')
      }
    }
    if (linhaBloco <= 2 && colunaBloco === 2) {
      for (let linha = 0; linha < campoGame.length; linha++) {
        campoGame[linha].unshift('')
      }
    }
    if (linhaBloco === 0 && colunaBloco <= 2) {
      campoGame.push(new Array(campoGame[0].length).fill(''))
    }
    if (linhaBloco === 2 && colunaBloco <= 2) {
      campoGame.unshift(new Array(campoGame[0].length).fill(''))
    }
    if (linhaBloco === 1 && colunaBloco === 1) {
      for (let linha = 0; linha < campoGame.length; linha++) {
        campoGame[linha].push('')
        campoGame[linha].unshift('')
      }
      campoGame.push(new Array(campoGame[0].length).fill(''))
      campoGame.unshift(new Array(campoGame[0].length).fill(''))
    }
    
    criaCampo()
    bloco.innerHTML = campoGame[linhaBloco][colunaBloco]
    adicionaClick(playerWin)
  }
  
  function tiraValoresCampo(linhaBloco, colunaBloco, e) {
    const ultimaMarcacao = e.target.innerHTML
    for (let linha = 0; linha < campoGame.length; linha++) {
      for (let coluna = 0; coluna < campoGame[0].length; coluna++) {
        campoGame[linha][coluna] = ''
      }
    }
    campoGame[linhaBloco][colunaBloco] = ultimaMarcacao
  }

  function testValorCampo() {
    console.log(campoGame)
    let camposPreenchidos = new Array(campoGame.length).fill(false)
    for (let linha = 0; linha < campoGame.length; linha++) {
      const filtro = campoGame[linha].filter(e => e === '')
      filtro.length < 1 ? camposPreenchidos[linha] = true : ''
      camposPreenchidos = camposPreenchidos
    }
    return camposPreenchidos.every(e => e === true)
  }

  function playerPodeJogar(playerWin, e) {

    if (playerWin !== true) {
      const linhaBloco = e.target.getAttribute('linha')
      const colunaBloco = e.target.getAttribute('coluna')
      e.target.innerHTML === '' ? campoGame[linhaBloco][colunaBloco] = player.player : ''
      e.target.innerHTML = campoGame[linhaBloco][colunaBloco]
    }
  }

  function refreshGame() {
    game.style.gridTemplateColumns = '1fr'
    game.style.gridTemplateRows = '1fr'
    const reloadGame = document.querySelector('button')
    reloadGame.onclick = () => {
      gameStart()
    }
  }

  function endGameDraw() {
    game.style.gridTemplateColumns = '1fr'
    game.style.gridTemplateRows = '1fr'
    game.innerHTML = `
          <div class='winner'>
            <p><strong>EMPATE!</strong></p>
            <button>JOGAR NOVAMENTE</button>
          </div>
        `
    refreshGame()
  }

  function endGameWin() {
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
  }

  function playerWinTest(playerWin) {
    let tamanho = {
      n_linhas: campoGame.length,
      n_colunas: campoGame[0].length
    }
    let linha = 0

    function testLinhas() {
      for (let linha = 0; linha < tamanho.n_linhas; linha++) {
        let win = 0
        campoGame[linha].forEach(e => e === player.player ? win++ : win = 0)
        win >= 3 ? playerWin = true : ''
      }
    }

    function testColunas() {
      for (let coluna = 0; coluna < tamanho.n_colunas; coluna++) {
        let win = 0
        for (let linha = 0; linha < tamanho.n_linhas; linha++) {
          campoGame[linha][coluna] === player.player ? win++ : win = 0
          win >= 3 ? playerWin = true : ''
        }
      }
    }

    function testDiagonal() {
      let refLinha = 0
      let linha = 0
      let coluna = 0

      for (refLinha; refLinha < tamanho.n_linhas; refLinha++) {
        let win = 0
        linha = 0 + refLinha
        coluna = 0
        for (linha; linha < tamanho.n_linhas; linha++) {
          campoGame[linha][coluna] === player.player ? win++ : win = 0
          coluna++
          win >= 3 ? playerWin = true : ''
        }

      }
      refLinha = 0

      for (refLinha; refLinha < tamanho.n_linhas; refLinha++) {
        let win = 0
        linha = 0 + refLinha
        coluna = tamanho.n_colunas - 1
        for (linha; linha < tamanho.n_linhas; linha++) {
          campoGame[linha][coluna] === player.player ? win++ : win = 0
          coluna--
          win >= 3 ? playerWin = true : ''
        }
      }
    }
    testLinhas()
    testColunas()
    testDiagonal()

    playerWin && endGameWin()
    return playerWin
  }

  const scoreP1 = document.querySelector('.s_p1')
  const scoreP2 = document.querySelector('.s_p2')
}