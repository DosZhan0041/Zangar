export interface PostPayloadApp {
  name: string;
  phone: number;
  direction: string;
}

export interface PatchPayloadApp {
  phone: string;
  direction: string;
}

export enum DirectionEnum {
  front = "front",
  back = "back",
  devops = "devops",
  ml = "ml",
}

export interface AppType {
  name: string;
  phone: string;
  direction: DirectionEnum;
  id: number;
}

export const initialApp: AppType = {
  name: "",
  phone: "",
  direction: DirectionEnum.front,
  id: 0,
};

export const DirectionOptions: { label: string; value: DirectionEnum }[] = [
  {
    label: "Front-End",
    value: DirectionEnum.front,
  },
  {
    label: "Back-End",
    value: DirectionEnum.back,
  },
  {
    label: "DevOps",
    value: DirectionEnum.devops,
  },
  {
    label: "Machine Learning",
    value: DirectionEnum.ml,
  },
];
