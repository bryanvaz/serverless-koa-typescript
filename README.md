# Serverless Koa Typescript Boilerplate (with Jest and Terraform)

This repo serves as the starting point for all Serverless API projects. The boilerplate creates a solid foundation for any AWS Lambda-based API project using Koa (in Typescript) with testing, ORM, infrastructure orchestration, and CI/CD already set up.

## Features
- Node >= 8.1.2 syntax support (through webpack)
- Serverless Framework to deploy Lambda (with 15 min execution support)
- Eslint as linter

## Components and Prerequisites
- **Runtime:** Node Carbon (managed with [nvm](https://github.com/nvm-sh/nvm))

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