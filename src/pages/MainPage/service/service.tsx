import { openApi } from "../../../shared/api/api";
import { BASE_URL } from "../../../shared/const/const";

export const getPeopleList = (page: number) => {
  return openApi(BASE_URL).get(`/people?page=${page}`);
};
