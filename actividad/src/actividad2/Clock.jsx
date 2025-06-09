import React, { useEffect, useReducer, useRef } from "react";

const initialState = {
  isRunning: false,
  time: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "start": return { ...state, isRunning: true };
    case "stop": return { ...state, isRunning: false };
    case "reset": return { isRunning: false, time: 0 };
    case "tick": return { ...state, time: state.time + 1 };
    default: throw new Error();
  }
}

export default function Clock() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) return;
    idRef.current = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => clearInterval(idRef.current);
  }, [state.isRunning]);

  return (
    <>
      <h2>Reloj</h2>
      <p><strong>Tiempo:</strong> {state.time}s</p>
      <button onClick={() => dispatch({ type: "start" })}>Iniciar</button>
      <button onClick={() => dispatch({ type: "stop" })}>Detener</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reiniciar</button>
    </>
  );
}
