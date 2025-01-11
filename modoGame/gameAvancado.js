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
                    <span class='campo campoHover' linha='${x}' coluna='${i}'>${elemento}</span>
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
        if(!playerWin) {
          player === players[0] ? player = players[1] : player = players[0]
          testValorCampo() ? criaNovoCampo(el, playerWin) : null
        } 
      })
    })
  }

  function criaNovoCampo(e, playerWin) {
    const linhaBloco = parseInt(e.target.getAttribute('linha'))
    const colunaBloco = parseInt(e.target.getAttribute('coluna'))
    const bloco = document.querySelector(`[linha='${linhaBloco}'][coluna='${colunaBloco}']`)
    let tamanho = {
      n_linhas: campoGame.length - 1,
      n_colunas: campoGame[0].length - 1
    }
    tiraValoresCampo(linhaBloco, colunaBloco, e)

    if (linhaBloco <= tamanho.n_linhas && colunaBloco === 0) {
      for (let linha = 0; linha < campoGame.length; linha++) {
        campoGame[linha].push('')
      }
    }
    if (linhaBloco <= tamanho.n_linhas && colunaBloco === tamanho.n_colunas) {
      for (let linha = 0; linha < campoGame.length; linha++) {
        campoGame[linha].unshift('')
      }
    }
    if (linhaBloco === 0 && colunaBloco <= tamanho.n_colunas) {
      campoGame.push(new Array(campoGame[0].length).fill(''))
    }
    if (linhaBloco === tamanho.n_linhas && colunaBloco <= tamanho.n_colunas) {
      campoGame.unshift(new Array(campoGame[0].length).fill(''))
    }
    if (linhaBloco === tamanho.n_linhas/2 && colunaBloco === tamanho.n_colunas/2) {
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
    let camposPreenchidos = new Array(campoGame.length).fill(false)
    for (let linha = 0; linha < campoGame.length; linha++) {
      const filtro = campoGame[linha].filter(e => e === '')
      filtro.length < 1 ? camposPreenchidos[linha] = true : ''
      camposPreenchidos = camposPreenchidos
    }
    return camposPreenchidos.every(e => e === true)
  }

  function playerPodeJogar(playerWin, e) {
    if (!playerWin) {
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

  function endGameWin(campos) {
    campos.forEach(campo => campo.className="campo")
    setTimeout(() => {
      game.innerHTML = `
        <div class='winner'>
          <p>JOGADOR <strong>${player.player}</strong> GANHOU!</p>
          <button>JOGAR NOVAMENTE</button>
        </div>
      `
      player.pontos += 1
      scoreP1.innerHTML = `${players[0].player} = ${players[0].pontos} pontos.`
      scoreP2.innerHTML = `${players[1].player} = ${players[1].pontos} pontos.`
      refreshGame()
    }, 2000)
  }

  function playerWinTest(playerWin) {
    let campos = document.querySelectorAll('.campo')
    let tamanho = {
      n_linhas: campoGame.length,
      n_colunas: campoGame[0].length
    }
    let linha = 0
    let coluna = 0
    let win = 0
    let marcacoes = []

    function testWin() {
      marcacoes.push([linha, coluna])
      campoGame[linha][coluna] === player.player ? win++ : win = 0

      if(win >= 3 && campoGame[linha][coluna] === player.player) {
        let x = marcacoes.length - 1
        let y = marcacoes[0].length - 1
        let btns = [
          document.querySelector(`[linha="${marcacoes[x-2][y-1]}"][coluna="${marcacoes[x-2][y]}"]`),
          document.querySelector(`[linha="${marcacoes[x-1][y-1]}"][coluna="${marcacoes[x-1][y]}"]`),
          document.querySelector(`[linha="${marcacoes[x][y-1]}"][coluna="${marcacoes[x][y]}"]`)
        ]
        btns.forEach(btn => btn.style.backgroundColor = "#ec9c07")

        playerWin = true
      }
    }
    
    function testLinhas() {
      linha = 0

      while(linha < tamanho.n_linhas) {
        win = 0
        coluna = 0

        while(coluna < tamanho.n_colunas) {
          testWin()
          
          coluna++
        }
        marcacoes = []
        linha++
      }
    }

    function testColunas() {
      coluna = 0

      while(coluna < tamanho.n_colunas) {
        win = 0
        linha = 0

        while(linha < tamanho.n_linhas) {
          testWin()
          
          linha++
        }
        marcacoes = []
        coluna++
      }

      
    }

    function testDiagonal() {
      let refLinha = 0

      while(refLinha < tamanho.n_linhas) {
        win = 0
        linha = 0 + refLinha
        coluna = 0
        
        while (linha < tamanho.n_linhas) {
          testWin()

          linha++
          coluna++
        }
        win = 0
        linha = 0 + refLinha
        coluna = tamanho.n_colunas - 1
        
        while(linha < tamanho.n_linhas) {
          testWin()
          
          linha++
          coluna--
        }
        marcacoes = []
        refLinha++
      }
    }

    testLinhas()
    testColunas()
    testDiagonal()

    playerWin && endGameWin(campos)
    return playerWin
  }

  const scoreP1 = document.querySelector('.s_p1')
  const scoreP2 = document.querySelector('.s_p2')
}