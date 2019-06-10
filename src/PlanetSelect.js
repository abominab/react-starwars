import React from "react";
import useAppContext from "./App";

const PlanetSelect = ({ initial }) => {
  const planets = useAppContext();

  console.log(planets);

  return <select />;
};

export default PlanetSelect;
