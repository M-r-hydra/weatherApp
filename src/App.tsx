import React, { useState, useEffect } from "react";
import { weatherObject } from "./Models/interfaces";
import { Get__weather } from "./Services/Get__weather";

const App = () => {
  const apiPriveteKey: string = "255078c440d74027af180653222911";
  const apiAddress: string = "https://api.weatherapi.com/v1/current.json";
  const [weatherData, setWeatherData] = useState<weatherObject>();
  const [errorInFetchData, setErrorInFetchData] = useState<string>("");
  const [fetchDataStatus, setFetchDataStatus] = useState<
    "done" | "receiving" | "error"
  >("receiving");

  useEffect(() => {
    Get__weather(apiAddress, apiPriveteKey, "auto:ip", setWeatherData);
  }, []);

  return <div></div>;
};

export default App;
