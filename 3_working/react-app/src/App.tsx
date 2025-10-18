import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import likeButton from "./img/like.svg";
import londonImg from "./img/london.jpg";
import heart from "./img/heart.svg";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const mode = import.meta.env.MODE;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <img src={likeButton} alt="Like logo" className="logo" />
        <img src={londonImg} alt="london logo" className="logo" />
        <img src={heart} alt="Heart logo" className="logo" />
      </div>

      <h1>Vite + React</h1>
      <h2>Mode: {mode}</h2>

      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
