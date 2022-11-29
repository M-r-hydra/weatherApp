// React
import React from "react";
// React
// CSS
import styles from "./WheatherShower.module.css";
// CSS
// Models
import { weatherObject } from "../../Models/interfaces";
import AboutCurrCity from "../AboutCurrCity/AboutCurrCity";
// Models

type WheatherShowerProps = {
  data: weatherObject | any;
};

const WheatherShower: React.FunctionComponent<WheatherShowerProps> = ({
  data: {
    current: {
      cloud,
      condition: { code, icon, text },
      feelslike_c,
      feelslike_f,
      gust_kph,
      gust_mph,
      humidity,
      is_day,
      last_updated,
      last_updated_epoch,
      precip_in,
      precip_mm,
      pressure_in,
      pressure_mb,
      temp_c,
      temp_f,
      uv,
      vis_km,
      vis_miles,
      wind_degree,
      wind_dir,
      wind_kph,
      wind_mph,
    },
    location: {
      country,
      lat,
      localtime,
      localtime_epoch,
      lon,
      name,
      region,
      tz_id,
    },
  },
}) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <AboutCurrCity cityName={`Country : ${country} City : ${name}`} />
      <img src={icon} alt="" />
    </div>
  );
};

export default WheatherShower;
