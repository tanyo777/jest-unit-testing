# Test Driven Development using Jest

What are software tests?

- Code that runs other code and make assertions or checks on it.
- Unit testing means testing the smallest unit (Method, Class, Module).

# Jest

Jest is a testing framework for writing and running test cases.Jest includes test runner and assertion library itself.
Jest searches for test, **test**, or file.test.ts files and folders and run those test suites.

# Jest setup

- npm install -D typescript jest ts-jest @types/jest ts-node @types/node

# Jest globals

- describe
  Creates a test suite and we can create test cases in it.Describe groups related test cases.

- it/test
  it or test is used within describe block/test suite to create test case.

- expect
  Create an assertion and check for expected value.
  EXAMPLE: expect(result).toEqual("Tanyo"); // assertion

# AAA principles

Triple A describes how a test should be structured.

- arrange
  const test = new TestClass();

- act
  const sum = test.sum(1, 2);

- assert (assertion)
  expect(sum).toEqual(3);

# Matchers

Matchers are functions for comparing actual and the expected value.
EXAMPLE: .toBe(), .toEqual()

- .toBe() // used for primitive types comparison

- .toEqual() // used for comparing reference types/non-primitive types like object, arrays, sets, maps, etc...

- .toHaveLength(number) // check the length of array, string

- .toContain(char) // check if character exists in array

- .not // the opposite of the next matcher

- .toBeFalsy() // expects falsy value (false, '', NaN, 0, undefined, null)

- .toBeTruthy() // expects truthy value

- .toBeUndefined() // expects undefined

- .toBeDefined() // expects value different than undefined

