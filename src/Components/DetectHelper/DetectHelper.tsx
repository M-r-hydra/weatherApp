// React
import React from "react";
// React
// CSS
import styles from "./DetectHelper.module.css";
// CSS
// Models
import { I_DetectOptions } from "../../Models/interfaces";
// Models

type DetectHelperProps = {
  onOptionsChange: Function;
};

const DetectHelper: React.FunctionComponent<DetectHelperProps> = ({
  onOptionsChange,
}) => {
  const options: I_DetectOptions[] = [
    {
      nameForShow: "Smart ( by your IP ) ",
      value: "ip",
    },
    {
      nameForShow: "by Your Choice ( city name ) ",
      value: "cityName",
    },
    {
      nameForShow: "by Lat & lon ( in Decimal Degree )",
      value: "lat&lon",
    },
    {
      nameForShow: "by postCode ( eg(uk) : SW1 )",
      value: "postCode",
    },
  ];
  return (
    <select
      onChange={(e: any) => {
        onOptionsChange(e.target.value);
      }}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.nameForShow}
        </option>
      ))}
    </select>
  );
};

export default DetectHelper;
