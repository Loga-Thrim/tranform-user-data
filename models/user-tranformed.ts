export interface ITranformedHair {
  [color: string]: number;
}

export interface ITranformedAddress {
  [userName: string]: string;
}

export interface ITranformedUser {
  [Department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: ITranformedHair;
    addressUser: ITranformedAddress;
  };
}
