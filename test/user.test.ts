import { IUser, IUserClass } from "../models";
import {
  classifyUserByDepartment,
  getAddressUser,
  getAgeRange,
  getGenderCount,
  getHairCount,
} from "../services/user-helper";
import users from "../mock/user.json";
import mock_empty_user from "../mock/user-empty.json";

describe("classifyUserByDepartment", () => {
  const expectedResult: IUserClass = {
    engineering: [
      {
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        age: 30,
        hair: { color: "brown" },
        address: { postalCode: "12345" },
        company: { department: "engineering" },
      },
      {
        firstName: "Jim",
        lastName: "Smith",
        gender: "male",
        age: 35,
        hair: { color: "black" },
        address: { postalCode: "24680" },
        company: { department: "engineering" },
      },
    ],
    sales: [
      {
        firstName: "Jane",
        lastName: "Doe",
        gender: "female",
        age: 25,
        hair: { color: "blonde" },
        address: { postalCode: "67890" },
        company: { department: "sales" },
      },
      {
        firstName: "Jack",
        lastName: "Brown",
        gender: "male",
        age: 32,
        hair: { color: "brown" },
        address: { postalCode: "97531" },
        company: { department: "sales" },
      },
    ],
    marketing: [
      {
        firstName: "Joan",
        lastName: "Williams",
        gender: "female",
        age: 28,
        hair: { color: "red" },
        address: { postalCode: "13579" },
        company: { department: "marketing" },
      },
    ],
  };

  test("should group users by department correctly", () => {
    const result = classifyUserByDepartment(users);
    expect(result).toEqual(expectedResult);
  });

  test("should return an empty object when input array is empty", () => {
    const result = classifyUserByDepartment([]);
    expect(result).toEqual({});
  });

  test("should handle input with a single user", () => {
    const singleUser: IUser = users[0];
    const result = classifyUserByDepartment([singleUser]);
    const expectedSingleResult: IUserClass = {
      engineering: [singleUser],
    };
    expect(result).toEqual(expectedSingleResult);
  });
});

describe("getAgeRange", () => {
  test("should return the correct age range for an array of ages", () => {
    const ages = [25, 30, 18, 42, 35];
    const ageRange = getAgeRange(ages);
    expect(ageRange).toBe("18-42");
  });

  test("should return the correct age range for an array with a single age", () => {
    const ages = [28];
    const ageRange = getAgeRange(ages);
    expect(ageRange).toBe("28-28");
  });

  test('should return "undefined-undefined" for an empty array', () => {
    const ages: number[] = [];
    const ageRange = getAgeRange(ages);
    expect(ageRange).toBe("undefined-undefined");
  });

  test("should show negative ages", () => {
    const ages = [-5, 10, 20];
    const ageRange = getAgeRange(ages);
    expect(ageRange).toBe("-5-20");
  });
});

describe("getGenderCount", () => {
  it("should return the correct gender count for an empty array", () => {
    const users = [];
    const result = getGenderCount(users);
    expect(result).toEqual({ male: 0, female: 0 });
  });

  it("should return the correct gender count for an array with only male users", () => {
    const users = [
      { ...mock_empty_user, gender: "male" },
      { ...mock_empty_user, gender: "male" },
      { ...mock_empty_user, gender: "male" },
    ];
    const result = getGenderCount(users);
    expect(result).toEqual({ male: 3, female: 0 });
  });

  it("should return the correct gender count for an array with only female users", () => {
    const users = [
      { ...mock_empty_user, gender: "female" },
      { ...mock_empty_user, gender: "female" },
      { ...mock_empty_user, gender: "female" },
    ];
    const result = getGenderCount(users);
    expect(result).toEqual({ male: 0, female: 3 });
  });

  it("should return the correct gender count for an array with mixed genders", () => {
    const users = [
      { ...mock_empty_user, gender: "male" },
      { ...mock_empty_user, gender: "female" },
      { ...mock_empty_user, gender: "male" },
      { ...mock_empty_user, gender: "female" },
    ];
    const result = getGenderCount(users);
    expect(result).toEqual({ male: 2, female: 2 });
  });

  it("should handle invalid gender values", () => {
    const users = [
      { ...mock_empty_user, gender: "male" },
      { ...mock_empty_user, gender: "invalid" },
      { ...mock_empty_user, gender: "female" },
    ];
    const result = getGenderCount(users);
    expect(result).toEqual({ male: 1, female: 1 });
  });
});

describe("getHairCount", () => {
  it("should return an empty object for an empty array of users", () => {
    const users: IUser[] = [];
    const result = getHairCount(users);
    expect(result).toEqual({});
  });

  it("should correctly count hair colors for a single user", () => {
    const users: IUser[] = [{ ...mock_empty_user, hair: { color: "black" } }];
    const result = getHairCount(users);
    expect(result).toEqual({ black: 1 });
  });

  it("should correctly count hair colors for multiple users", () => {
    const users: IUser[] = [
      { ...mock_empty_user, hair: { color: "black" } },
      { ...mock_empty_user, hair: { color: "brown" } },
      { ...mock_empty_user, hair: { color: "black" } },
      { ...mock_empty_user, hair: { color: "blonde" } },
    ];
    const result = getHairCount(users);
    expect(result).toEqual({ black: 2, brown: 1, blonde: 1 });
  });

  it("should handle users with invalid hair color values", () => {
    const users: IUser[] = [
      { ...mock_empty_user, hair: { color: "black" } },
      { ...mock_empty_user, hair: { color: null } },
      { ...mock_empty_user, hair: { color: undefined } },
      { ...mock_empty_user, hair: { color: "brown" } },
    ];
    const result = getHairCount(users);
    expect(result).toEqual({ black: 1, brown: 1 });
  });
});

describe("getAddressUser", () => {
  it("should return an empty object for an empty array of users", () => {
    const users: IUser[] = [];
    const result = getAddressUser(users);
    expect(result).toEqual({});
  });

  it("should correctly map full names to postal codes for a single user", () => {
    const users: IUser[] = [
      {
        ...mock_empty_user,
        firstName: "John",
        lastName: "Doe",
        address: { postalCode: "12345" },
      },
    ];
    const result = getAddressUser(users);
    expect(result).toEqual({ JohnDoe: "12345" });
  });

  it("should correctly map full names to postal codes for multiple users", () => {
    const users: IUser[] = [
      {
        ...mock_empty_user,
        firstName: "John",
        lastName: "Doe",
        address: { postalCode: "12345" },
      },
      {
        ...mock_empty_user,
        firstName: "Jane",
        lastName: "Smith",
        address: { postalCode: "67890" },
      },
      {
        ...mock_empty_user,
        firstName: "Bob",
        lastName: "Johnson",
        address: { postalCode: "23456" },
      },
    ];
    const result = getAddressUser(users);
    expect(result).toEqual({
      JohnDoe: "12345",
      JaneSmith: "67890",
      BobJohnson: "23456",
    });
  });

  it("should handle users without address information", () => {
    const users: IUser[] = [
      {
        ...mock_empty_user,
        firstName: "John",
        lastName: "Doe",
        address: { postalCode: "12345" },
      },
      {
        ...mock_empty_user,
        firstName: "Jane",
        lastName: "Smith",
        address: {
          postalCode: undefined,
        },
      },
    ];
    const result = getAddressUser(users);
    expect(result).toEqual({ JohnDoe: "12345", JaneSmith: undefined });
  });

  it("should handle users with missing first or last name", () => {
    const users: IUser[] = [
      {
        ...mock_empty_user,
        firstName: "John",
        lastName: "Doe",
        address: { postalCode: "12345" },
      },
      {
        ...mock_empty_user,
        firstName: "",
        lastName: "Smith",
        address: { postalCode: "67890" },
      },
      {
        ...mock_empty_user,
        firstName: "Bob",
        lastName: "",
        address: { postalCode: "23456" },
      },
    ];
    const result = getAddressUser(users);
    expect(result).toEqual({ JohnDoe: "12345", Smith: "67890", Bob: "23456" });
  });
});
