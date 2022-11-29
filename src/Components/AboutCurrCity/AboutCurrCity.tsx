// React
import React from "react";
// React
// CSS
import styles from "./AboutCurrCity.module.css";
// CSS

type AboutCurrCityProps = {
  cityName: string;
};

const AboutCurrCity: React.FunctionComponent<AboutCurrCityProps> = ({
  cityName,
}) => {
  return <div className="">{cityName}</div>;
};

export default AboutCurrCity;
