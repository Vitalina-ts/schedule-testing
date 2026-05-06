/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  testRunner: "jest",
  jest: {
    configFile: "jest.config.js",
    config: {
      testMatch: ["**/src/helper/**/*.test.js"],
      coverageThreshold: undefined,
    }
  },
  mutate: [
    // Вкажіть файли вашого варіанту, наприклад:
    "src/helper/getScheduleType.js",
    "src/helper/renderScheduleTable.js"
  ],
  mutator: {
    plugins: [],
    excludedMutations: []
  },
  reporters: ["html", "clear-text", "progress"],
  htmlReporter: {
    fileName: "reports/mutation/mutation.html"
  },
  coverageAnalysis: "perTest"
};
export default config;