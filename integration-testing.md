# Integration Testing

Multiple components tested together.
For example testing a express server route.Under the hood the route queries the database, does some checks and some extra validation, etc...
This is called integration test because we are testing the whole route and all its underlying services and make assertions of the response.
We might clear the database after those tests but it's not required, depending on the data testers and QA's.
Integrations tests should not use mocks but if there is a external service that cannot be tested you could mock it.

Integration Test ---> Register Route ---> Insert into database (register service)
