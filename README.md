# Serverless Koa Typescript Boilerplate (with Jest and Terraform)

This repo serves as the starting point for all Serverless API projects. The boilerplate creates a solid foundation for any AWS Lambda-based API project using Koa (in Typescript) with testing, ORM, infrastructure orchestration, and CI/CD already set up.

## Features
- Node ~8.1.2 syntax support (through webpack), which is required by Lambda
- Serverless Framework to deploy Lambda (with 15 min execution support)
- Eslint as linter

## Components and Prerequisites
- **Language:** [Typescript v3.5](https://github.com/microsoft/TypeScript) with ECMA2018 support
- **Dev Runtime:** Node Dubnium (see [ES2018](https://node.green/) support)
- **Framework:** [KoaJS v2](https://github.com/koajs/koa/) - API only implementation
- **Linter:** ESLint with Typescript [Support](https://github.com/typescript-eslint/typescript-eslint)
- **Git Hooks:** Provided by [husky](https://github.com/typicode/husky) 🐶 and [lint-staged](https://github.com/okonet/lint-staged) 🚫💩
- **Logger:** [Winston](https://github.com/winstonjs/winston)
- **Test Framework:** [Jest](https://jestjs.io/) & [Supertest](https://github.com/visionmedia/supertest)
- **Security Headers:** [HelmetJS](https://github.com/venables/koa-helmet)
- **Serverless Framwork:** [Serverless]()


## Getting Started
1. Copy `.env.example` to `.env`
1. Copy `serverless.env.example.yml` to `serverless.env.example.yml`
2. Run `yarn`
3. Run `yarn watch`
4. Wait a sec for the server to spin up ...
5. In a browser or Postman, go to `http://localhost:3000` to see **Hello World!**

## Testing
Unit Testing is accomplished through the Jest(https://jestjs.io/) framework. In addition, API requests are mocked using the Supertest wrapper around the Koa API.

Run all tests with `yarn test`.

Tests are broken down into the blocks/types:
1. **Application Level Tests** - These are integration tests that test the entire API server as it would run in Lambda (without the Lambda wrapper, triggered by an external API request. These test how all the components fit together including, but not limited to, the router, middleware, controllers, models, and DB connections.
<br>_Common uses include: ensuring model consistency across multiple controllers, middleware consistency across endpoints, and role/user restrictions across endpoints and controllers_
2. **Router Level Tests** - Router tests ensure the correct controllers are mounted at the correct endpoints. This is critical as external services depend on the stability of the endpoints.
3. **Controller Level Test** - Controller tests mount individual controllers (and individual functions) in vanilla Koa servers to confirm granular level functionality. This decreases the rigor of application-level & router-level testing required.

## Setting up Custom Domains
See https://serverless.com/blog/serverless-api-gateway-domain/ for additional details.

## Enterprise Serverless
To set up your function to use enterprise serverless:
1. Register at https://dashboard.serverless.com
2. Run `yarn sls login` to connect your local installation to Serverless Enterprise
3. Uncomment and populate: 
    ```
    tenant:  MyTenantID
    app:   MyAppID
    org: MyOrgID
    ```

## Author
Bryan Vaz (Github: [@bryanvaz](https://github.com/bryanvaz))

## Thanks to
* https://github.com/javieraviles/node-typescript-koa-rest for inspiration and baseline reference koa typescript implementation

## Additional Reference
* Git Hooks: https://medium.com/gits-apps-insight/utilizing-git-hook-by-using-eslint-husky-and-lint-staged-18b6f6f60f1e