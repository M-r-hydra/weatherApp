import { I_locationValue } from "./../Models/interfaces";
import axios from "axios";

export const get__locationByLatLonService = (
  cityName: string,
  stateCode: string | number,
  countryCode: string | number,
  privateAPIKey: string,
  setLocationValue: React.Dispatch<React.SetStateAction<I_locationValue>>
): Promise<boolean> => {
  return axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${
        cityName || stateCode || countryCode
      }&limit={limit}&appid=${privateAPIKey}`
    )
    .then((res) => {
      setLocationValue((prevState: I_locationValue): I_locationValue => {
        return { ...prevState, lat: res?.data?.lat, lon: res?.data?.lon };
      });
      return true;
    })
    .catch(() => {
      console.log("Err :/");
      return false;
    });
};
