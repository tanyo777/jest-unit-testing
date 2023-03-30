# TDD (Test Driven Development)

# TDD Styles

First declare what is a unit (a class, a function or a feature).

- London
  A Unit: Class
  Mock all its dependencies

- Chicago
  A Unit: Collection of pieces
  Test from a broader view
  Little use of mocks

# Event Based App Testing

Example code: ./src/server_app/utils/Utils.ts

# Prototype Spy

Spy on the classes prototype objects.

# Heavy mocks approach

Allows us to test our units in isolation.
Also we don't interact with 3rd party services but we create mocks for them.

Disadvantages:

- When we change the implementation we also have to change the tests.

# Low mocks approach

Mock as little as possible.
For example we must create fakes for our request and response objects to mimic their behaviour.
For databases or external services we have to always create mocks.
