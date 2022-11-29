import React, { useState, useEffect, useCallback } from "react";
import DetectHelper from "./Components/DetectHelper/DetectHelper";
import WheatherShower from "./Components/WhatherShower/WheatherShower";
import { I_locationValue, weatherObject } from "./Models/interfaces";
import { Get__weatherService } from "./Services/Get__weatherService";

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
  const [userSelectedCityValue, setUserSelectedCityValue] =
    useState<string>("Tehran");
  const [userSelectedLat, setUserSelectedLat] = useState<string>("");
  const [userSelectedLon, setUserSelectedLon] = useState<string>("");
  // States
  // Methods

  // Methods
  const selectedLocation = useCallback(() => {
    const getLocation = function getLocation(): string {
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
    };
    return getLocation();
  }, [locationValue, locationType]);

  // Life cycles
  useEffect(() => {
    Get__weatherService(
      apiAddress,
      apiPriveteKey,
      selectedLocation(),
      setWeatherData,
      setFetchDataStatus
    );
  }, [locationType, selectedLocation]);
  // Life cycles

  return (
    <div>
      {fetchDataStatus === "receiving" && (
        <h1 className="receiving">{"receiving Data "}</h1>
      )}
      {fetchDataStatus === "error" && (
        <>
          <button
            onClick={() => {
              Get__weatherService(
                apiAddress,
                apiPriveteKey,
                selectedLocation(),
                setWeatherData,
                setFetchDataStatus
              );
            }}
          >
            Try Again
          </button>
        </>
      )}
      {fetchDataStatus === "done" && (
        <>
          <DetectHelper
            onOptionsChange={(value: string) => {
              if (value === "ip") {
                setLocationType("ip");
                return;
              } else if (value === "cityName") {
                setLocationValue(
                  (prevState: I_locationValue): I_locationValue => {
                    return { ...prevState, cityName: userSelectedCityValue };
                  }
                );
                setLocationType("cityName");
                return;
              } else if (value === "lat&lon") {
                setLocationValue(
                  (prevState: I_locationValue): I_locationValue => {
                    return {
                      ...prevState,
                      lat: userSelectedLon,
                      lon: userSelectedLon,
                    };
                  }
                );
                setLocationType("lat&lon");
                return;
              } else if (value === "postCode") {
                setLocationType("postCode");
                return;
              }
            }}
          />
          <WheatherShower data={weatherData} />
        </>
      )}
    </div>
  );
};

export default App;
