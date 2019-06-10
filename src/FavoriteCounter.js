import React from "react";
import "./FavoriteCounter.css";

const FavoriteCounter = ({ count }) => {
  return <div className="favoriteCount">Favorite Count: {count}</div>;
};

export default FavoriteCounter;
