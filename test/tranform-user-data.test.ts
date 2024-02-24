import { transformUserData } from "../services/user";

const {
  classifyUserByDepartment,
  getAddressUser,
  getAgeRange,
  getGenderCount,
  getHairCount,
} = require("../services/user-helper");

jest.mock("../services/user-helper", () => ({
  classifyUserByDepartment: jest.fn(),
  getAgeRange: jest.fn(),
  getGenderCount: jest.fn(),
  getHairCount: jest.fn(),
  getAddressUser: jest.fn(),
}));

describe("transformUserData", () => {
  const users = [
    {
      age: 25,
      gender: "male",
      hair: { color: "black" },
      firstName: "John",
      lastName: "Doe",
      address: { postalCode: "12345" },
      company: { department: "sales" },
    },
    {
      age: 30,
      gender: "female",
      hair: { color: "brown" },
      firstName: "Jane",
      lastName: "Smith",
      address: { postalCode: "67890" },
      company: { department: "sales" },
    },
    {
      age: 35,
      gender: "male",
      hair: { color: "blonde" },
      firstName: "Bob",
      lastName: "Johnson",
      address: { postalCode: "23456" },
      company: { department: "marketing" },
    },
  ];

  beforeEach(() => {
    classifyUserByDepartment.mockReturnValue({
      sales: users.slice(0, 2),
      marketing: users.slice(2),
    });
    getAgeRange.mockReturnValue({ min: 25, max: 35 });
    getGenderCount.mockImplementation((users) => {
      const male = users.filter(({ gender }) => gender === "male").length;
      const female = users.filter(({ gender }) => gender === "female").length;
      return { male, female };
    });
    getHairCount.mockReturnValue({ black: 1, brown: 1, blonde: 1 });
    getAddressUser.mockImplementation((users) => {
      return users.reduce((acc, { firstName, lastName, address }) => {
        const fullName = `${firstName}${lastName}`;
        acc[fullName] = address.postalCode;
        return acc;
      }, {});
    });
  });

  it("should correctly transform user data", () => {
    const result = transformUserData(users);
    expect(result).toEqual({
      sales: {
        male: 1,
        female: 1,
        ageRange: { min: 25, max: 35 },
        hair: { black: 1, brown: 1, blonde: 1 },
        addressUser: { JohnDoe: "12345", JaneSmith: "67890" },
      },
      marketing: {
        male: 1,
        female: 0,
        ageRange: { min: 25, max: 35 },
        hair: { black: 1, brown: 1, blonde: 1 },
        addressUser: { BobJohnson: "23456" },
      },
    });
  });
});
