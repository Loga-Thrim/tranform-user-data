import { FEMALE, MALE } from "../constants/user";
import {
  IGender,
  ITranformedAddress,
  ITranformedHair,
  IUser,
  IUserClass,
} from "../models";

export function classifyUserByDepartment(users: IUser[]): IUserClass {
  return users.reduce((acc, user) => {
    const { department } = user.company;
    if (!department) return acc;
    if (!acc[department]) acc[department] = [];
    acc[department].push(user);
    return acc;
  }, {} as IUserClass);
}

export function getAgeRange(ages: number[]): string {
  if (!ages.length) return "undefined-undefined";
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  return `${minAge}-${maxAge}`;
}

export function getGenderCount(users: IUser[]): IGender {
  return users.reduce(
    (acc, { gender }) => {
      if (gender === MALE) {
        acc.male++;
      } else if (gender === FEMALE) {
        acc.female++;
      }
      return acc;
    },
    { male: 0, female: 0 }
  );
}

export function getHairCount(users: IUser[]): ITranformedHair {
  return users.reduce((acc, { hair }) => {
    const { color } = hair;
    if (color) acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {} as ITranformedHair);
}

export function getAddressUser(users: IUser[]): ITranformedAddress {
  return users.reduce((acc, { firstName, lastName, address }) => {
    const fullName = `${firstName}${lastName}`;
    acc[fullName] = address.postalCode;
    return acc;
  }, {} as ITranformedAddress);
}
