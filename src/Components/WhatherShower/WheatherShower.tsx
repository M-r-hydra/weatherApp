// React
import React from "react";
// React
// CSS
import styles from "./WheatherShower.module.css";
// CSS
// Models
import { weatherObject } from "../../Models/interfaces";
// Models

type WheatherShowerProps = {
  data: weatherObject | any;
};

const WheatherShower: React.FunctionComponent<WheatherShowerProps> = ({
  data,
}) => {
  return <div>WheatherShower</div>;
};

export default WheatherShower;
