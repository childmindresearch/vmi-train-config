# VMI Train Configuration Frontend

This repository serves as the frontend for creating configurations for the VMI Train task. It leverages the power of JSON Forms to provide a dynamic and user-friendly interface for configuration creation.

## Repository Structure

- **React Application**: The core application resides in the `src` directory. The main entry point is [App.tsx](https://github.com/childmindresearch/vmi-train-config/blob/master/src/App.tsx) and the primary rendering logic is in [index.tsx](https://github.com/childmindresearch/vmi-train-config/blob/master/src/index.tsx).
- **Configuration Schema**: The JSON schema that defines the structure and constraints of the configuration is located in [schema.json](https://github.com/childmindresearch/vmi-train-config/blob/master/src/schema.json).
- **Testing Suite**: Cypress tests can be found in the `cypress` directory. The primary test suite is [test_form.spec.js](https://github.com/childmindresearch/vmi-train-config/blob/master/cypress/integration/test_form.spec.js).
- **CI/CD Configuration**: Continuous Integration and Deployment configurations are housed in the `.github/workflows` directory. The main CI workflow is in [main.yml](https://github.com/childmindresearch/vmi-train-config/blob/master/.github/workflows/main.yml) and the GitHub Pages deployment configuration is in [gh_pages.yaml](https://github.com/childmindresearch/vmi-train-config/blob/master/.github/workflows/gh_pages.yaml).

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm ci`.
3. Launch the development server using `npm start`.
4. To execute Cypress tests, run `npm run cypress:ci`.

## Contributing

We welcome contributions! Please ensure to run all tests and adhere to the repository's coding standards before submitting a pull request.
