import React, { useState, useEffect, useCallback } from "react";
import DetectHelper from "./Components/DetectHelper/DetectHelper";
import WheatherShower from "./Components/WhatherShower/WheatherShower";
import { I_locationValue, weatherObject } from "./Models/interfaces";
import { get__locationByLatLonService } from "./Services/Get__locationByLatLonService";
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
  const [currLocationData, setCurrLocationData] = useState<I_locationValue>({
    cityName: "",
    lat: "",
    lon: "",
    postcode: "",
    cityCode: "",
    countryCode: "",
  });
  const [errorInFetchData, setErrorInFetchData] = useState<string>("");
  const [fetchDataStatus, setFetchDataStatus] = useState<
    "done" | "receiving" | "error"
  >("receiving");
  const [userSelectedCityValue, setUserSelectedCityValue] =
    useState<string>("Tehran");
  const [userInputData, setUserInputData] = useState<I_locationValue>({
    cityCode: "",
    cityName: "",
    countryCode: "",
    lat: "",
    lon: "",
    postcode: "",
  });
  // States
  // Methods
  // Methods
  const selectedLocation = useCallback(() => {
    function getLocation(): string {
      switch (locationType) {
        case "cityName":
          return currLocationData.cityName || "";
        case "ip":
          return "auto:ip";
        case "lat&lon":
          return `${currLocationData.lat},${currLocationData.lon}`;
        case "postCode":
          return currLocationData.postcode || "0";
        default:
          return "";
      }
    }
    return getLocation();
  }, [currLocationData, locationType]);

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
  useEffect(() => {
    if (locationType === "cityName") {
      get__locationByLatLonService(
        userInputData.cityName,
        "",
        "",
        apiPriveteKey,
        setCurrLocationData,
        setFetchDataStatus
      );
      return;
    } else if (locationType === "postCode") {
      get__locationByLatLonService(
        "",
        userInputData.cityCode,
        "",
        apiPriveteKey,
        setCurrLocationData,
        setFetchDataStatus
      );
      return;
    } else if (locationType === "ip") {
      Get__weatherService(
        apiAddress,
        apiPriveteKey,
        selectedLocation(),
        setWeatherData,
        setFetchDataStatus
      );
      return;
    }
  }, [locationType, userInputData]);
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
                setCurrLocationData(
                  (prevState: I_locationValue): I_locationValue => {
                    return { ...prevState, cityName: userSelectedCityValue };
                  }
                );
                setLocationType("cityName");
                return;
              } else if (value === "lat&lon") {
                get__locationByLatLonService(
                  currLocationData.cityName,
                  currLocationData.postcode,
                  currLocationData.countryCode,
                  apiPriveteKey,
                  setCurrLocationData,
                  setFetchDataStatus
                );
                setLocationType("lat&lon");
                return;
              } else if (value === "postCode") {
                setLocationType("postCode");
                return;
              }
            }}
          />
          <WheatherShower
            data={weatherData}
            onCityChange={(value: string): void => {
              setUserInputData((prevState) => ({
                ...prevState,
                cityName: value,
              }));
            }}
          />
        </>
      )}
    </div>
  );
};

export default App;
