import React from "react";
import "./Card.css";

const Card = ({ birthday, homePlanet, image, name }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-name">{name}</div>
        <img src={`http://localhost:3008/${image}`} alt="profile" />
        <p>
          <span>Birthday:</span>
          <span>{birthday}</span>
        </p>
        <p>
          {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
          <span>Homeworld:</span>
          <span>{homePlanet}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
