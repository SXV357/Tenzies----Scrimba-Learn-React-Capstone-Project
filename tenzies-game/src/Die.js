import React from "react";

export default function Die({ isHeld, value, handleClick, id }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "#FFFFFF",
  };

  // The high-level design pattern for flex-box based dice in CSS was borrowed from the following source:
  // https://betterprogramming.pub/creating-dice-in-flexbox-in-css-a02a5d85e516
  // Author: Javascript Jeep
  function determineDots() {
    switch (value) {
      case 1:
        return (
          <div className="one" style={styles}>
            <span className="dot"></span>
          </div>
        );
      case 2:
        return (
          <div className="two" style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        );
      case 3:
        return (
          <div className="three" style={styles}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        );
      case 4:
        return (
          <div className="four" style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="five" style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
            </div>

            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="six" style={styles}>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        );
    }
  }
  return (
    <div
      onClick={() => {
        if (isHeld) {
          return;
        } else {
          handleClick(id);
        }
      }}
      style={styles}
      className="die"
    >
      {determineDots()}
    </div>
  );
}
