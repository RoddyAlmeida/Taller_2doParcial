import React from "react";
import { useUser } from "./contexts/hooks";
import "./styles.css";

export default function LoginButton() {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div className="login-container">
      {currentUser ? (
        <p>Estás logueado como {currentUser.name}</p>
      ) : (
        <button onClick={() => setCurrentUser({ name: "Advika" })}>
          Logueate como Advika
        </button>
      )}
    </div>
  );
}
