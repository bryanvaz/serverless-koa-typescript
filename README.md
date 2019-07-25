# Serverless Koa Typescript Boilerplate (with Jest and Terraform)

This repo serves as the starting point for all Serverless API projects. The boilerplate creates a solid foundation for any AWS Lambda-based API project using Koa (in Typescript) with testing, ORM, infrastructure orchestration, and CI/CD already set up.

## Features
- Node >= 8.1.2 syntax support (through webpack)
- Serverless Framework to deploy Lambda (with 15 min execution support)
- Eslint as linter

## Components and Prerequisites
- **Language:** [Typescript v3.5](https://github.com/microsoft/TypeScript) with ECMA2018 support
- **Dev Runtime:** Node Dubnium (see [ES2018](https://node.green/) support)
- **Framework:** [KoaJS v2](https://github.com/koajs/koa/) - API only implementation
- **Linter:** ESLint with Typescript [Support](https://github.com/typescript-eslint/typescript-eslint)
- **Git Hooks:** Provided by [husky](https://github.com/typicode/husky) 🐶 and [lint-staged](https://github.com/okonet/lint-staged) 🚫💩
- **Logger:** [Winston](hhttps://github.com/winstonjs/winston)


## Getting Started
1. Copy `.env.example` to `.env`
2. Run `yarn`
3. Run `yarn watch`
4. Wait a sec for the server to spin up ...
5. In a browser or Postman, go to `http://localhost:3000` to see **Hello World!**

## Author
Bryan Vaz (Github: [@bryanvaz](https://github.com/bryanvaz))

## Thanks to
* https://github.com/javieraviles/node-typescript-koa-rest for inspiration and baseline reference koa typescript implementation

## Additional Reference
* Git Hooks: https://medium.com/gits-apps-insight/utilizing-git-hook-by-using-eslint-husky-and-lint-staged-18b6f6f60f1e