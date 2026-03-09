import { openApi } from "../../../shared/api/api";
import { LOCAL_URL } from "../../../shared/const/const";
import { PatchPayloadApp, PostPayloadApp } from "../types/types";

export const postApp = (data: PostPayloadApp) => {
  return openApi(LOCAL_URL).post("/applications", data);
};

export const getAppList = () => {
  return openApi(LOCAL_URL).get("/applications");
};

export const getApp = (id: number) => {
  return openApi(LOCAL_URL).get(`/applications/${id}`);
};

export const patchApp = (id: number, data: PatchPayloadApp) => {
  return openApi(LOCAL_URL).patch(`/applications/${id}`, data);
};

export const deleteApp = (id: number) => {
  return openApi(LOCAL_URL).delete(`/applications/${id}`);
};
