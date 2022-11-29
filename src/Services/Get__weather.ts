import axios from "axios";
import Swal from "sweetalert2";

export const Get__weather = (
  Get__fullAPI_Address: string,
  API_privateKey: string,
  location: string,
  setWeatherData: Function
): Promise<boolean | { err: Error; value: false }> => {
  return axios
    .get(`${Get__fullAPI_Address}?key=${API_privateKey}&q=${location}`)
    .then((res) => {
      setWeatherData(res.data);
      return true;
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: err.response.data.error.message,
      });
      return { err, value: false };
    });
};
