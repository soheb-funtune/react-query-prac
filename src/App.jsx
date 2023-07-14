import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getTodos, deleteTodos } from "./states/services.js";

function App() {
  const [count, setCount] = useState([]);
  const apiData = getTodos();
  useEffect(() => {
    apiData && setCount(apiData);
  }, [apiData]);
  const { mutate } = deleteTodos();
  // console.log({ apiData, count });
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {count?.map((item) => (
          <div key={item?.id} style={{ display: "flex" }}>
            <h3>{item?.title}</h3>
            <button onClick={() => mutate({ ...item, title: "sayyad soheb" })}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
