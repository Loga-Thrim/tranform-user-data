interface IHair {
  color: string;
}

interface IAddress {
  postalCode: string;
}

interface ICompany {
  department: string;
}

export interface IGender {
  male: number;
  female: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: IHair;
  address: IAddress;
  company: ICompany;
}

export interface IUserClass {
  [Department: string]: IUser[];
}


