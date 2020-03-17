module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom-sixteen",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  globals: {
    "ts-jest": {
      packageJson: "package.json",
    },
  },
};
