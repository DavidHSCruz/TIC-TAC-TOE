import gameNormal from './modoGame/gameNormal.js'
import gameAvancado from './modoGame/gameAvancado.js'
import gameAvancado2 from './modoGame/gameAvancado2.js'
const audioClick = new Audio('./sonds/click.mp3')
const audioWin = new Audio('./sonds/win.mp3')
const audioDraw = new Audio('./sonds/draw.mp3')

const game = document.querySelector('.GAME')

export default function menuGame() {
  game.style.gridTemplateColumns = '1fr 1fr'
  game.style.gridTemplateRows = '1fr'
  game.innerHTML = `  <button class='modo_normal'>MODO NORMAL</button>
                      <button class='modo_avancado'>MODO AVANÇADO</button>
  `
  const modoNormal = document.querySelector('.modo_normal')
  const modoAvancado = document.querySelector('.modo_avancado')
  const modoAvancado2 = document.querySelector('.modo_avancado2')

  modoNormal.addEventListener('click', () => {
    audioClick.play()
    gameNormal(audioClick, audioWin, audioDraw)
  })
  modoAvancado.addEventListener('click', () => {
    audioClick.play()
    gameAvancado(audioClick, audioWin, audioDraw)
    })
  /*modoAvancado2.addEventListener('click', () => {
    audioClick.play()
    gameAvancado2(audioClick, audioWin, audioDraw)
  })*/
}
menuGame()
