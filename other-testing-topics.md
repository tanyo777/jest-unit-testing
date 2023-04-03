# Other Testing Topics

# Environment Variables

With setupFiles property in the jest configuration we can load environment variables or other code.

- setupFiles: [] // files to be loaded before our tests

# Multiple Test Configurations

We can run multiple configuration files depending on the needs.

Example: jest --config second.config.ts // run another configuration

# Snapshot Testing

We use snapshot testing to test large objects or UI components.
Create snapshot of the object and store it in a file and use it for testing.
Next time we run tests it will compare the tested object with the created snapshot file.

- npm run test -- -u (update the snapshot)

# CI/CD Pipeline with Github Actions

Create Github action workflows and create several jobs (test,build, etc..).
