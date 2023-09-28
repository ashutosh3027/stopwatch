import React, { useState, useEffect } from "react";
import "./../css/home.css";

export default function Home() {
  const [minClock, setMinClock] = useState(5);
  const [secClock, setSecClock] = useState('00');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (parseInt(secClock) > 0) {
          setSecClock((prev) => (parseInt(prev) - 1).toString().padStart(2, '0'));
        } else if (parseInt(minClock) > 0) {
          setMinClock((prev) => (parseInt(prev) - 1).toString());
          setSecClock('59');
        } else {
          clearInterval(interval);
          setIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minClock, secClock]);

  const handleStartClick = () => {
    setIsActive(true);
  };

  const handleStopClick = () => {
    setIsActive(false);
  };

  const handleResetClick = () => {
    setIsActive(false);
    setMinClock(5);
    setSecClock('00');
  };

  return (
    <div className="home-container">
      <div className="clock-container">
        <p className="minClock clock">
          <span className="minClockNum clockNum">{minClock}</span>m
        </p>
        <p className="secClock clock">
          <span className="secClockNum clockNum">{secClock}</span>s
        </p>
      </div>
      <hr className="divider" />
      <div className="fotter">
        <button className="start btn" onClick={handleStartClick}>START</button>
        <button className="stop btn" onClick={handleStopClick}>STOP</button>
        <button className="reset btn" onClick={handleResetClick}>RESET</button>
      </div>
    </div>
  );
}
