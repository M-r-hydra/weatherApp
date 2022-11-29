import axios from "axios";
import Swal from "sweetalert2";

export const Get__weather = (
  Get__fullAPI_Address: string,
  API_privateKey: string,
  location: string,
  setWeatherData: Function
): Promise<boolean> => {
  return axios
    .get(`${Get__fullAPI_Address}?key=${API_privateKey}&q=${location}`)
    .then((res) => {
      console.log(res.data);
      return true;
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error In Fetch Data !",
      });
      return false;
    });
};
