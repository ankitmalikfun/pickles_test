> # Overview

Test Email Notification service.

# Technology Stack

- [Node.js](https://nodejs.org) `v14` server.
- [NPM](https://docs.npmjs.com) `v7` Node Package Manager.
- [TypeScript](https://www.typescriptlang.org/docs/home.html) `v3.7.2` is a language for application-scale JavaScript.
- [Express](https://expressjs.com/) `v4.16.3` node.js framework for building REST APIs
- [Jest](https://jestjs.io/docs/en/getting-started) `v26.6.3` Jest is used to test JavaScript frameworks
- [Supertest](https://www.npmjs.com/package/supertest) `v6.1.3` provide a high-level abstraction for testing HTTP

# Prerequisite


# Key Features

1. **src/config**:
   This folder has mainly one file:
   - `config.core.ts` which contains all the configurable variables required in the service. Use this file to add any new variable. This file basically picks up variables from `environment (process.env)`, will use default if not found. In order to set these variables, create a `.env` file (similar to `.env-example` file)
2. **src/controllers:** it contains all the features required in this service with each feature in separate folder, currently, there is multiple feature named accordingly.
   There are some commonly used files in each controller method with different feature:
   - `controller.ts` contains all the methods related with that feature, called on an API endpoint request
   - `router.ts` contains all the routes related with this feature
   - `validation.ts` contains validation for request parameters or data
3. **src/lib**:
   This folder has common library which we can use in our services, in future we can create a separate package for this. Currently, it has few files:

   - `Logger.ts` Logger Lib and various related methods
   - `Swagger.ts` Swagger class and related methods
   - `constants.ts` constants file contain all the constants
   - `validations.ts` This file contains all common validation for request parameters or data

4. **src/entities**:
   This folder has common library which we can use in our services, in future we can create a separate package for this. Currently, it has mainly two folders:
   - `errors` it has classes to handle API errors
   - `responses` Different types of API response with appropriate code
5. **src/repositories** The repository is a gateway between your domain/business layer and a data mapping layer, which is the layer that accesses the database and does the operations. Basically, the repository is an abstraction to your database access. TODO: This is currently empty, but we need to update our flow to use repositories
6. **src/services** The service provide an API to your business logic, therefore being an abstraction to your repository, because the business layer is an abstraction of your data access layer, It has following services:
   - `MailTransporter.ts`
   - `Database.ts` DB Connection

# Getting Started - Setup

This section is for getting started with Kue server on your development environment.

1. **Clone the repository**

```
git clone https://github.com/ankitmalikfun/pickles_test.git
```

2. **Configure app**

Clone `.env.example` and rename it to `.env` then edit it with your settings. You will need:

##### SMTP environment variables

- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_AUTH_USER`
- `EMAIL_AUTH_PASS`

# How to start/run service

This section is for starting/running the service.

1. **Install all the package.json file's dependencies by running the below command**

```
npm install
```

2. **To start the application, run the below command**

```
npm run start
```

3. **To run the service, open the below url in web browser**

```
http://localhost:3000/api-docs/
```

### IDE

- Preferred IDE is `VSCODE`

Please enable following plugins for your editor:

- **EditorConfig:** To enable reading of .editorconfig file for consistent coding convention.
- **SonarLint:** To enable error catch by sonarjs.
- **TSlint:** For linting errors

### Troubleshooting section

- TODO

### Note:
Used mailtrap.oi for test mail account
 
- **It's a email sandbox service. Please use test sanbox account credentials for testing the service**
