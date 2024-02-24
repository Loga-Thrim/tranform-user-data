import { ITranformedUser, IUser } from "../models";
import {
  classifyUserByDepartment,
  getAddressUser,
  getAgeRange,
  getGenderCount,
  getHairCount,
} from "./user-helper";

export function transformUserData(users: IUser[]): ITranformedUser {
  let tranformedUsers: ITranformedUser = {};
  const userClasses = classifyUserByDepartment(users);

  for (const department of Object.keys(userClasses)) {
    const ages = userClasses[department].map(({ age }) => age);
    const ageRange = getAgeRange(ages);
    const { male, female } = getGenderCount(userClasses[department]);
    const hair = getHairCount(userClasses[department]);
    const addressUser = getAddressUser(userClasses[department]);

    tranformedUsers[department] = {
      male,
      female,
      ageRange,
      hair,
      addressUser,
    };
  }

  return tranformedUsers;
}
