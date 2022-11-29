import axios from "axios";
import Swal from "sweetalert2";
import { weatherObject } from "../Models/interfaces";

export const Get__weather = (
  Get__fullAPI_Address: string,
  API_privateKey: string,
  location: string,
  setWeatherData: React.Dispatch<
    React.SetStateAction<weatherObject | undefined>
  >,
  setFetchData: React.Dispatch<
    React.SetStateAction<"done" | "error" | "receiving">
  >
): Promise<boolean | { err: Error; value: false }> => {
  return axios
    .get(`${Get__fullAPI_Address}?key=${API_privateKey}&q=${location}`)
    .then((res) => {
      setWeatherData(res.data);
      setFetchData("done");
      return true;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: err.response.data.error.message,
      });
      setFetchData("error");
      return { err, value: false };
    });
};
