import React, { useReducer } from "react";

const initialState = {
  name: "Taylor",
  surname: "Feels",
  age: 42
};

function reducer(state, action) {
  switch (action.type) {
    case "incremented_age":
      return { ...state, age: state.age + 1 };
    case "decremented_age":
      return { ...state, age: state.age - 1 };
    case "changed_name":
      return { ...state, name: action.nextName };
    case "changed_surname":
      return { ...state, surname: action.nextSurName };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function PersonForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>Modificar Perfil de Persona</h2>
      <label>Nombre:</label>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: "changed_name", nextName: e.target.value })}
      />
      <label>Apellido:</label>
      <input
        value={state.surname}
        onChange={(e) => dispatch({ type: "changed_surname", nextSurName: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "incremented_age" })}>+ Edad</button>
      <button onClick={() => dispatch({ type: "decremented_age" })}>- Edad</button>

      <h3>Perfil</h3>
      <p><strong>Nombre:</strong> {state.name}</p>
      <p><strong>Apellido:</strong> {state.surname}</p>
      <p><strong>Edad:</strong> {state.age}</p>
    </>
  );
}
