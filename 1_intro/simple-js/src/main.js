import './style.css'
import javascriptLogo from './img/javascript.svg'
import viteLogo from '/vite.svg'
import likeButton from './img/like.svg'
import londonImg from './img/london.jpg'
import heart from '/heart.svg'
import { setupCounter } from './counter.js'
// import { average, randomUUID } from 'cool-math'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${likeButton}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${londonImg}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${heart}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
// console.log('Average: ' +  average(1,2,3))
// console.log('Random UUID:', randomUUID());