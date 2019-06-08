import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card.js";
import SearchBar from "./SearchBar.js";
import star from "./images/star.svg";
import wars from "./images/wars.svg";

const App = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    let current = true;
    fetch(`http://localhost:3008/people`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(json => {
        // console.log(`people:`, json);
        if (current) {
          setPeople(json);
        }
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:3008/planets`)
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(json => {
        // console.log(`planets:`, json);
        if (current) {
          setPlanets(json);
        }
      })
      .catch(err => console.error(err));

    return () => {
      current = false;
    };
  }, []);

  return (
    <div className="content">
      <div className="logo">
        <img src={star} alt="star-logo" />
        <span className="interview-text">The Interview</span>
        <img src={wars} alt="wars-logo" />
      </div>
      <SearchBar />
      {people.map(({ birth_year, homeworld, id, image, name }) => {
        console.log(homeworld, planets.find(planet => planet.id === homeworld));

        return (
          <Card
            birthday={birth_year}
            // homePlanet={planets.find(planet => planet.id === homeworld).name}
            image={image}
            key={id}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default App;
