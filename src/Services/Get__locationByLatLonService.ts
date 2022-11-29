import { I_locationValue } from "./../Models/interfaces";
import axios from "axios";

export const get__locationByLatLonService = (
  cityName: string,
  stateCode: string | number,
  countryCode: string | number,
  privateAPIKey: string,
  setLocationValue: React.Dispatch<React.SetStateAction<I_locationValue>>,
  setFetchStatus: React.Dispatch<
    React.SetStateAction<"done" | "error" | "receiving">
  >
): Promise<boolean> => {
  return axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${
        cityName.length !== 0
          ? cityName
          : false || stateCode.toString().length !== 0
          ? stateCode
          : false || countryCode.toString().length !== 0
          ? countryCode
          : false
      }&limit=5&appid=${privateAPIKey}`
    )
    .then((res) => {
      setFetchStatus("done");
      console.log(res.data);
      //   setLocationValue((prevState: I_locationValue): I_locationValue => {
      //     return { ...prevState, lat: res?.data?.lat, lon: res?.data?.lon };
      //   });
      return true;
    })
    .catch(() => {
      console.log("Err :/");
      setFetchStatus("error");
      return false;
    });
};
