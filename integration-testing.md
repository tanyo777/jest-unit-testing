# Integration Testing

Multiple components tested together.
For example testing a express server route.Under the hood the route queries the database, does some checks and some extra validation, etc...
This is called integration test because we are testing the whole route and all its underlying services and make assertions of the response.
We might clear the database after those tests but it's not required, depending on the data testers and QA's.
Integrations tests should not use mocks but if there is a external service that cannot be tested you could mock it.

Integration Test ---> Register Route ---> Insert into database (register service)

# Integration tests on dev/test

To test an application for dev and test we should set env variables and to which database the application should connect (dev db/test db) and execute the integration tests.

# Environments

- Dev Environment (with devDependencies)
  Used by the developers to create new features.
  Tests, Lints and build should pass on the pipeline.

- Test Environment (with devDependencies)
  It's mostly used by the QA'a to test the application end to end.

- Stage/Staging Environment (without devDependencies)
  The application is tested and deployed to the stage environment where it can be used for UAT.

- Production Environment (without devDependencies)
  Used by customers.
