# Intermediate Testing Topics

# F.I.R.S.T Principles

- Fast (faster feedback from a test)

- Independent (no shared state with other tests)

- Repeatable (with same input always show same output)
  Example of repeatable test: test that writes to a database, should always clean up after that

- Self-validating (after test completes, it's result is clear - Pass or Fail)

- Through
  Cover all the cases/paths/scenarios of the system.

# Setup and Teardown (Jest Hooks)

Jest hooks help us reduce code duplication.
Jest hooks should be created inside a describe and they will be executed and available in the context of it.

- beforeEach(() => {}); // runs before each test
- afterEach(() => {}); // runs after each test - clearing mocks, clear already created db record

- beforeAll(() => {}); // runs before all tests
- afterAll(() => {}); // runs after all tests are done

# Testing for errors

1. Using try/catch

Pseudo code

```
try {
    function();
} catch(err) {
    expect(err).toBeInstaceOf(Error);
    expect(err).toHaveProperty("message", "Error Message!");
}
```

2. Wrapping the code inside a function and use .toThrowError(message)

```
function toUpperCase(argument) {
    if(!argument) {
        throw Error("Invalind Argument!");
    }

    return argument.toUpperCase();
}

function expectError() {
    toUpperCase("");
}

expect(expectError).toThrowError("Invalid Argument!);

```

# Jest aliases and watch mode

- only
  describe.only() // will run only this describe
  it/test.only() // will run only this test case inside the describe

- skip
  describe.skip() // skip test suite

- it.todo() // todo test case

We can run tests in watch mode and jest will continously watch for any changes in the test files and will rerun them on save.

- jest --watchAll (will rerun all tests)

- jest --watch (will rerun only the changed test)

# Debugging with VSCode

Nodejs typescript debugging configuration

```
{
    "type": "node-terminal",
    "request": "launch",
    "name": "Debug Current TS File (ts-node)",
    "command": "npx ts-node -- ${fileBasenameNoExtension}",
    "skipFiles": ["<node_internals>/**"],
    "cwd": "${fileDirname}"
}
```

Jest debugging configuration

```
{
    "type": "node-terminal",
    "name": "Debug Current Test File (npm run test)",
    "request": "launch",
    "command": "npm run test -- ${fileBasenameNoExtension}",
    "cwd": "${fileDirname}"
}
```

# Test Coverage Report
