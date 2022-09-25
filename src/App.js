import { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import parse from "./lib/parse";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // const [input, setInput] = useState("");
  // console.log(input);
  // const evaluation = (x) => {
  //   try {
  //     let ans = eval(x);
  //     return ans;
  //   } catch {}
  // };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The calculator</h1>
      </header>
      <main>
        <Calculator />
      </main>
    </div>
  );
}

export default App;
