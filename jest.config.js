module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  testMatch: ["**/*.spec.(ts)"],
  testEnvironment: "node",
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverageFrom: [
    "src/**/*.(ts)",
    "!src/index.ts",
    "!src/types/morgan-body.d.ts",
    "!src/seed/**/*.(ts)",
    "!src/**/**/entities/index.ts",
    "!src/repositories/BaseRepository.ts",
    "!src/deprecated/**/*.ts",
    "!src/entities/**/*.(ts)",
    "!src/tests/mocks/**/*.ts",
    "!src/middlewares/errorHandler.ts",
    "!src/services/NotificationService.ts",
    "!src/services/GraphQLService.ts"
  ],
  verbose: true
};
