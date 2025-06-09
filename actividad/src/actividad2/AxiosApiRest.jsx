import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AxiosApiRest() {
  const [data, setData] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    axios.get(url)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h2>Todos recuperados de la API</h2>
      {data.slice(0, 10).map(item => (
        <div key={item.id}>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Título:</strong> {item.title}</p>
          <p><strong>Completado:</strong> {item.completed ? "Sí" : "No"}</p>
          <hr />
        </div>
      ))}
    </>
  );
}
