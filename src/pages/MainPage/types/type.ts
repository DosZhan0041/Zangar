export interface PeopleDataType {
  count: number;
  next: string;
  previous: string;
  results: InfoPeople[];
}

export type genType = {
  male: string;
  female: string;
};

export interface InfoPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: genType;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export const initialPeopleData: PeopleDataType = {
  count: 0,
  next: "",
  previous: "",
  results: [],
};
