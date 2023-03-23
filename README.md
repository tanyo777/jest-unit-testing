# Test Driven Development using Jest

What are software tests?
- Code that runs other code and make assertions or checks on it.
- Unit testing means testing the smallest unit (Method, Class, Module).


# Jest
Jest is a testing framework for writing and running test cases.Jest includes test runner and assertion library itself.
Jest searches for test, __test__, or file.test.ts files and folders and run those test suites.

# Jest setup
- npm install -D typescript jest ts-jest @types/jest ts-node @types/node

# Jest globals

- describe
Creates a test suite and we can create test cases in it.Describe groups related test cases.

- it/test
it or test is used within describe block/test suite to create test case.

- expect
Create an assertion and check for expected value.
EXAMPLE: expect(result).toEqual("Tanyo");

# AAA principles
Triple A describes how a test should be structured.

- arrange
const test = new TestClass();

- act
const sum = test.sum(1, 2);

- assert
expect(sum).toEqual(3);


# Setup and Teardown