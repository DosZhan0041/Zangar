import { notification } from "antd";
import axios, { AxiosInstance } from "axios";

const showNotification = (message: string) => {
  notification.error({ message });
};

export const openApi = (baseUrl: string): AxiosInstance => {
  const resolvedBaseUrl = baseUrl;

  const instance = axios.create({ baseURL: resolvedBaseUrl });

  instance.interceptors.response.use(
    (response) => response,
    (error) => handleError(error),
  );

  return instance;
};

const handleError = (error: any) => {
  if (!error.response) {
    showNotification("Ошибка сети или сервера");
    throw error;
  } else if (error.response.data?.message) {
    showNotification(error.response.data.message);
  } else {
    showNotification("Что-то пошло не так");
  }

  throw error;
};
