import gameNormal from './modoGame/gameNormal.js'
import gameAvancado from './modoGame/gameAvancado.js'

const game = document.querySelector('.GAME')

export default function menuGame() {
  game.style.gridTemplateColumns = '1fr 1fr'
  game.style.gridTemplateRows = '1fr'
  game.innerHTML = `  <button class='modo_normal'>MODO NORMAL</button>
                      <button class='modo_avancado'>MODO AVANÇADO</button>
  `
  const modoNormal = document.querySelector('.modo_normal')
  const modoAvancado = document.querySelector('.modo_avancado')
  
  modoNormal.addEventListener('click', gameNormal)
  modoAvancado.addEventListener('click', gameAvancado)
}
menuGame()
