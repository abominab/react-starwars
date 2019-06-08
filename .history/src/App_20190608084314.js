import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card.js";
import SearchBar from "./SearchBar.js";
import star from "./images/star.svg";
import wars from "./images/wars.svg";

const App = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlantes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3008/people`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(json => {
        setPeople(json);
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:3008/planets`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(json => {
        setPlantes(json);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="content">
      <div className="logo">
        <img src={star} alt="star-logo" />
        <span className="interview-text">The Interview</span>
        <img src={wars} alt="wars-logo" />
      </div>
      <SearchBar />
      {people.map(person => (
        <Card
          birthday={person.birth_year}
          homePlanet={person.planet}
          image={person.image}
          name={person.name}
        />
      ))}
    </div>
  );
};

export default App;