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

# Heavy mock testing

Allows us to test our units in isolation.
Also we don't interact with 3rd party services but we create mocks for them.

Disadvantages:

- When we change the implementation we also have to change the tests.
