export default function gameAvancado2(audioClick, audioWin, audioDraw) {
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
    campoGame = new Array(3).fill(new Array(3).fill(new Array(9).fill('')))

  }
}