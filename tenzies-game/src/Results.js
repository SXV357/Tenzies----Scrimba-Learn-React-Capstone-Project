import React, { useState, useEffect } from "react";

export default function Results({ initialTime, newGame }) {
  const minutes = Math.floor((initialTime / 60000) % 60);
  const seconds = Math.floor((initialTime / 1000) % 60);
  const milliseconds = Math.floor((initialTime / 10) % 100);

  const [minMessage, setMinMessage] = useState("");
  const [secMessage, setSecMessage] = useState("");
  const [milMessage, setMilMessage] = useState("");

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

  return (
    <div className="results">
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
        }}
      >
        {`You took ${minMessage} ${secMessage} ${milMessage} to finish the game.`}
      </h1>
      <button className="roll-btn" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}
