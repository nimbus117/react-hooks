import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    You're building an app to see how many times you can click
    a button in 10 seconds. 

    The UI has three parts, a button, a timer counting down from 10,
    and a clickCount of how many times you've clicked the button.

    Once the timer reaches 0, remove the button from the UI.
*/

function CounterGame() {
  const [clickCount, setClickCount] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(10);
  const interval = React.useRef();

  React.useEffect(() => {
    interval.current = window.setInterval(
      () => setTimeLeft((x) => x - 1),
      1000
    );
    return () => window.clearInterval(interval.current);
  }, []);

  React.useEffect(() => {
    if (timeLeft === 0) {
      window.clearInterval(interval.current);
    }
  }, [timeLeft]);

  return (
    <div className="App">
      <h1>{clickCount}</h1>
      <h2>time left: {timeLeft} seconds</h2>
      {timeLeft > 0 ? (
        <button onClick={() => setClickCount((x) => x + 1)}>+</button>
      ) : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CounterGame />, rootElement);
