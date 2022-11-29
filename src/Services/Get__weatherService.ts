// Moduels
import axios from "axios";
import Swal from "sweetalert2";
// Moduels
// Models
import { weatherObject } from "../Models/interfaces";
// Models

export const Get__weatherService = async (
  Get__fullAPI_Address: string,
  API_privateKey: string,
  location: string,
  setWeatherData: React.Dispatch<
    React.SetStateAction<weatherObject | undefined>
  >,
  setFetchStatus: React.Dispatch<
    React.SetStateAction<"done" | "error" | "receiving">
  >
): Promise<boolean | { err: Error; value: false }> => {
  return axios
    .get(`${Get__fullAPI_Address}?key=${API_privateKey}&q=${location}`)
    .then((res) => {
      setWeatherData(res.data);
      setFetchStatus("done");
      return true;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: err.response.data.error.message,
      });
      setFetchStatus("error");
      return { err, value: false };
    });
};
