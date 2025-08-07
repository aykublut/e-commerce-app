import axios from "axios";

import type { userType } from "../Types/Types";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:10000",
});

export let basarili = false;

export const axiosPost = async (payload: userType) => {
  try {
    if (payload) {
      await axiosInstance.post("/users", payload);

      toast.success("Başarıyla kayıt eklendi");
      basarili = true;
    } else {
      toast.error("hata!");
      basarili = false;
    }
  } catch (error: any) {
    toast.error(error.message);
    basarili = false;
  }
};

export const axiosLogin = async (payload: userType) => {
  try {
    if (payload) {
      const response = await axiosInstance.get("/users");
      const data = response.data;
      let result = false;

      data.map((obj: userType) => {
        console.log(obj);
        if (
          obj.username === payload.username &&
          obj.password === payload.password
        ) {
          result = true;
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      return result;
    }
  } catch (error) {}
};
