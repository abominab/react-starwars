import React, { useState } from "react";
import "./Card.css";
import PlanetSelect from "./PlanetSelect";

const Card = ({ birthday, homePlanet, id, image, name }) => {
  const [editMode, setEditMode] = useState(false);
  const [cardBday, setCardBday] = useState(birthday);
  const [cardName, setCardName] = useState(name);

  const handleSubmit = args => {
    console.log(args);
    fetch(`http://localhost:3008/people/${id}`, {
      body: JSON.stringify({ name: cardName, birth_year: cardBday }),
      headers: { "content-type": `application/json` },
      method: `PATCH`
    })
      .then(res => {
        if (res.ok) {
          setEditMode(false);
          return;
        }

        return Promise.reject(res.statusText);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-name">
          {editMode ? (
            <input
              type="text"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
            />
          ) : (
            <span>{cardName}</span>
          )}
        </div>
        <img src={`http://localhost:3008/${image}`} alt="profile" />
        <p>
          <span>Birthday:</span>
          {editMode ? (
            <input
              type="text"
              value={cardBday}
              onChange={e => setCardBday(e.target.value)}
            />
          ) : (
            <span>{cardBday}</span>
          )}
        </p>
        <p>
          {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
          <span>Homeworld:</span>
          <span>{homePlanet}</span>
          {/* {editMode ? <PlanetSelect /> : <span>{homePlanet}</span>} */}
        </p>
        <p
          onClick={() => {
            if (editMode) {
              // revert back to original if we don't save the edits
              setCardBday(birthday);
              setCardName(name);
            }
            setEditMode(!editMode);
          }}
        >
          Edit
        </p>
        {editMode && <p onClick={handleSubmit}>Save</p>}
      </div>
    </div>
  );
};

export default Card;
