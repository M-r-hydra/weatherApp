import React, { useState, useEffect } from "react";
import { I_locationValue, weatherObject } from "./Models/interfaces";
import { Get__weather } from "./Services/Get__weather";

const App = () => {
  // api and Key
  const apiPriveteKey: string = "255078c440d74027af180653222911";
  const apiAddress: string = "https://api.weatherapi.com/v1/current.json";
  // api and Key
  // States
  const [weatherData, setWeatherData] = useState<weatherObject>();
  const [locationType, setLocationType] = useState<
    "ip" | "cityName" | "lat&lon" | "postCode"
  >("ip");
  const [locationValue, setLocationValue] = useState<I_locationValue>({
    cityName: "",
    lat: "",
    lon: "",
    postcode: "",
  });
  const [errorInFetchData, setErrorInFetchData] = useState<string>("");
  const [fetchDataStatus, setFetchDataStatus] = useState<
    "done" | "receiving" | "error"
  >("receiving");
  // States
  // Methods
  function getLocation(): string {
    switch (locationType) {
      case "cityName":
        return locationValue.cityName || "";
      case "ip":
        return "auto:ip";
      case "lat&lon":
        return `${locationValue.lat},${locationValue.lon}`;
      case "postCode":
        return locationValue.postcode || "0";
      default:
        return "";
    }
  }
  // Methods
  // Life cycles
  useEffect(() => {
    Get__weather(apiAddress, apiPriveteKey, getLocation(), setWeatherData)
      .then(() => {
        setFetchDataStatus("done");
      })
      .catch((err) => {});
  }, []);
  // Life cycles

  return <div></div>;
};

export default App;
