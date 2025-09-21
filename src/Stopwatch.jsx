import React, { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start the stopwatch
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop the stopwatch
  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  // Reset stopwatch
  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setSeconds(0);
  };

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stopwatch</h1>
      <h2>Time:{seconds}s</h2>
      <div>
        <button onClick={handleStart} style={{ margin: "5px" }}>Start</button>
        <button onClick={handleStop} style={{ margin: "5px" }}>Stop</button>
        <button onClick={handleReset} style={{ margin: "5px" }}>Reset</button>
      </div>
    </div>
  );
}
