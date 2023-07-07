import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Results({ initialTime, newGame, bestRolls }) {
  const minutes = Math.floor((initialTime / 60000) % 60);
  const seconds = Math.floor((initialTime / 1000) % 60);
  const milliseconds = Math.floor((initialTime / 10) % 100);

  const [minMessage, setMinMessage] = useState("");
  const [secMessage, setSecMessage] = useState("");
  const [milMessage, setMilMessage] = useState("");

  const {innerWidth, innerHeight} = window;

  useEffect(() => {
    setMinMessage(
      minutes === 0 ? "" : `${minutes} ${minutes > 1 ? `minutes` : `minute`}  `
    );
    setSecMessage(
      seconds === 0 ? "" : `${seconds} ${seconds > 1 ? `seconds` : `second`}  `
    );
    setMilMessage(
      milliseconds === 0
        ? ""
        : `${milliseconds} ${
            milliseconds > 1 ? `milliseconds` : `millisecond`
          } `
    );
  }, [minutes, seconds, milliseconds]);

  const ResultContainerStyles = {
    textAlign: "center",
    color: "#fff",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  }

  return (
    <div className="results" style = {ResultContainerStyles}>
      <Confetti width = {innerWidth} height = {innerHeight}/>
      <header><h1>{`Your best time: ${minMessage} ${secMessage} ${milMessage}`}</h1></header>
      <header><h1>{`Your best rolls: ${bestRolls}`}</h1></header>
      <button className="roll-btn" onClick={newGame}>
        New Game
      </button>
    </div>
  );
} 