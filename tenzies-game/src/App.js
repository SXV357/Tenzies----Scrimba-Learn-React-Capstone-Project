import React, {useState, useEffect} from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import './style.css'
import Confetti from 'react-confetti'

export default function App(){
    function allNewDice() {
        const newDiceArray = []
        for (let i = 0; i < 10; i++) {
            newDiceArray.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            })
        }
        return newDiceArray
    }

    const [newDice, setNewDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [numRolls, setNumRolls] = useState(0)
    const [initialTime, setInitialTime] = useState(0)
    const [timerStart, setTimerStart] = useState(false)
    const [bestTime, setBestTime] = useState(JSON.parse(localStorage.getItem('time')) || 0)

    useEffect(() => {
        let runTimer;
        if (timerStart){
          runTimer = setInterval(() => {
            setInitialTime(prevTime => prevTime + 10) // increment by 10 milliseconds every 10 milliseconds
          }, 10)
        }
        else{
          clearInterval(runTimer)
        }

        return () => { // cleanup function to prevent memory leak upon component unmount
          clearInterval(runTimer)
        }
    }, [timerStart])

    useEffect(()=>{
      const allHeld = newDice.every(die => die.isHeld)
      const allSame = newDice.every(die => die.value === newDice[0].value)
      if (allHeld && allSame){
        setTenzies(true)
        setTimerStart(false)
        alert(`You took ${Math.floor((initialTime / 60000) % 60)} minutes, ${Math.floor((initialTime / 1000) % 60)} seconds, and ${Math.floor((initialTime / 10) % 100)} milliseconds to win the game`)        
        localStorage.setItem("time", JSON.stringify(initialTime / 1000))
      }
    },[newDice])

    function holdDice(id){
      setNewDice(prevDice => {
        return prevDice.map(die => {
          if (die.id === id){
            return {...die, isHeld: !die.isHeld}
          }
          else{
            return die
          }
        })
      })
    }
    
    function rollDice() {
        setNewDice(oldDice => {
            return oldDice.map(die => {
                if (die.isHeld){
                    return die
                }
                else{
                    return {...die, value: Math.ceil(Math.random() * 6)}
                }
            })
        })
    }

    function newGame(){
        setNewDice(allNewDice())
        setTenzies(false)
        setNumRolls(0)
        setInitialTime(0)
    }

    function trackNumRolls(){
        if (!tenzies){
            setNumRolls(prevCount => prevCount + 1)
        }
    } 

    function genFunc(){
      if (tenzies){
        newGame();
      }
      else{
        rollDice();
        trackNumRolls();
      }
    }
 
    const diceElements = newDice.map(die => (
        <Die handleClick = {holdDice} id = {die.id} isHeld = {die.isHeld} key={die.id} value={die.value} />
    ))

  return(
    <main>
      {tenzies && <Confetti />}
      <div className = "description">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p></div>
      <div className = "die-container">
            {diceElements}
        </div>
        <div className = "num-rolls">Number of Rolls: {numRolls}</div>
          <div className = "timer">
        <span className = "minutes">{("0" + Math.floor(((initialTime / 60000) % 60))).slice(-2 )}:</span>
        <span className = "seconds">{("0" + Math.floor(((initialTime / 1000) % 60))).slice(-2 )}:</span>
        <span className = "milliseconds">{("0" + ((initialTime / 10) % 100)).slice(-2 )}</span>
          </div>
        <div className = "timer-btns">
        {!timerStart && initialTime === 0 && <button onClick = {()=> setTimerStart(true)} className = "start-btn">Start timer</button>}
        {initialTime !== 0 && <button onClick = {()=> setTimerStart(false)} className = "stop-btn">Stop timer</button>}
        {initialTime !== 0 && <button onClick = {() => setTimerStart(true)} className = "reset-btn">Resume timer</button>}    
        {initialTime !== 0 && <button onClick = {() => setInitialTime(0)}>Reset Timer</button>} 
        </div>
        
        <button onClick = {genFunc} className = "roll-btn">{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}
