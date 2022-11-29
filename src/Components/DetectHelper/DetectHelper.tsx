import React from "react";
import { I_DetectOptions } from "../../Models/interfaces";

const DetectHelper = () => {
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
    <select onChange={() => {}}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.nameForShow}
        </option>
      ))}
    </select>
  );
};

export default DetectHelper;
