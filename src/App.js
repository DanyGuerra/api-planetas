import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState({});
  const [actual, setActual] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    apiFetch();
  }, []);

  useEffect(() => {
    apiFetch();
  }, [currentPage]);

  const apiFetch = async () => {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${currentPage}`
    );
    const jsonRes = await response.json();
    setData(jsonRes);
    setPlanets(jsonRes.results);
  };

  const handlePlanet = (index) => {
    setActual(index);
  };
  const handleNextPage = () => {
    if (data.next) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="App">
      <ul>
        {planets.map((e, index) => {
          return (
            <li
              onClick={() => handlePlanet(index)}
              key={index}
              className="item"
            >
              {e.name}
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={handlePrevPage}>Prev</button>
        <span>|{currentPage}|</span>
        <button onClick={handleNextPage} disabled={!data.next}>
          Next
        </button>
      </div>
      {planets.map((e, index) => {
        return actual === index ? (
          <div key={index}>
            <h2>{e.name}</h2>
            <ul>
              <li>Diameter: {e.diameter}</li>
              <li>Population: {e.population}</li>
              <li>Rotation period: {e.rotation_period}</li>
            </ul>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default App;
