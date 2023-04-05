import React, { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./style.css";
import Confetti from "react-confetti";
import Results from "./Results";

export default function App() {
  // Called when the "New Game button is hit"
  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      newDiceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDiceArray;
  }

  // State values
  const [newDice, setNewDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numRolls, setNumRolls] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);

  useEffect(() => {
    let runTimer;
    if (timerStart) {
      runTimer = setInterval(() => {
        setInitialTime((prevTime) => prevTime + 10); // increment by 10 milliseconds every 10 milliseconds
      }, 10);
    } else {
      clearInterval(runTimer);
    }

    return () => {
      // cleanup function to prevent memory leak upon component unmount
      clearInterval(runTimer);
    };
  }, [timerStart]);

  // Checking each time when the user freezes a die whether all share the same isHeld and value prop
  useEffect(() => {
    const allHeld = newDice.every((die) => die.isHeld);
    const allSame = newDice.every((die) => die.value === newDice[0].value);
    if (allHeld && allSame) {
      setTenzies(true);
      setTimerStart(false);
    }
  }, [newDice]);

  // Return type: object with a modified isHeld property or default values
  function holdDice(id) {
    if (!timerStart) {
      setTimerStart(true); // if the user clicks on a die to start off with and not the timer
    }
    setNewDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.id === id) {
          // Output(Background changes based on the isHeld property)
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      });
    });
  }

  // The value of a held dice doesn't change but if it isn't, it changes to a random number between 1 and 6
  function rollDice() {
    setNewDice((oldDice) => {
      return oldDice.map((die) => {
        if (die.isHeld) {
          return die;
        } else {
          return { ...die, value: Math.ceil(Math.random() * 6) };
        }
      });
    });
  }

  // reset timer, values on all dice, isHeld property, and number of rolls it took for user to win the game
  function newGame() {
    setNewDice(allNewDice());
    setTenzies(false);
    setNumRolls(0);
    setInitialTime(0);
  }

  function trackNumRolls() {
    if (!tenzies) {
      setNumRolls((prevCount) => prevCount + 1);
    }
  }

  const diceElements = newDice.map((die) => (
    <Die
      handleClick={holdDice}
      id={die.id}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ));

  return (
    <>
      {tenzies ? (
        <>
          <Results initialTime={initialTime} newGame={newGame} />
          <Confetti />
        </>
      ) : (
        <main>
          <div className="description">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
          </div>
          <div className="die-container">{diceElements}</div>
          <div className="num-rolls">Number of Rolls: {numRolls}</div>
          <div className="timer">
            <span className="minutes">
              {("0" + Math.floor((initialTime / 60000) % 60)).slice(-2)}:
            </span>
            <span className="seconds">
              {("0" + Math.floor((initialTime / 1000) % 60)).slice(-2)}:
            </span>
            <span className="milliseconds">
              {("0" + ((initialTime / 10) % 100)).slice(-2)}
            </span>
          </div>
          <div className="timer-btns">
            {!timerStart && initialTime === 0 && (
              <button onClick={() => setTimerStart(true)} className="start-btn">
                Start timer
              </button>
            )}
            {initialTime !== 0 && (
              <button onClick={() => setTimerStart(false)} className="stop-btn">
                Stop timer
              </button>
            )}
            {initialTime !== 0 && (
              <button onClick={() => setTimerStart(true)} className="reset-btn">
                Resume timer
              </button>
            )}
            {initialTime !== 0 && (
              <button onClick={() => setInitialTime(0)}>Reset Timer</button>
            )}
          </div>

          <button
            onClick={() => {
              if (!tenzies) {
                rollDice();
                trackNumRolls();
              }
            }}
            className="roll-btn"
          >
            Roll
          </button>
        </main>
      )}
    </>
  );
}
