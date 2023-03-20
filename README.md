# Unit and Integration Testing using Jest

Jest itself have assertion library and test runner.
We can also generate test coverage for the project using jest.


Jest recognizes test file in three ways:
- files that have extension .test.js
- files that have extension .spec.js
- All files inside __tests__ folder or directory.


# Test Nodejs API
- https://www.testim.io/blog/unit-test-rest-api/


# Jest Unit Testing

Jest is a testing library which includes a test runner and assertion library.With Jest we can run/create test cases and also generate test coverage report.

- describe
Creates a block that groups together several related tests.

- test/it
Creates and runs a test case.

- expect
The expect function is used to check if the values meet certain conditions and gives you access to different matchers to validate it.
EXAMPLE: expect(valueof name).toEqual("string"); // true/false

- beforeAll

- beforeEach

- afterEach

- afterAll

# Mock Functions/Spies

# Testing Asynchronous Code
We can use async/await with try/catch in the test case to test asyncronous code.
We can also use .resolves/.rejects to wait for the promise to resolve or reject and then validate the otput.

EXAMPLE:  expect(fetchName()).resolves.toEqual("Tanyo");