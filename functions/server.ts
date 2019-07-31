/* eslint-disable @typescript-eslint/no-var-requires */
import { ApplicationServer } from '../app';

const slsHttp = require('serverless-http');

const app = new ApplicationServer();

const slsHttpHandler = slsHttp(app, {
  request: (request, event): void => {
    request.context = event.requestContext;
    request.multiValueQueryStringParameters = event.multiValueQueryStringParameters;
  },
});

module.exports.handler = slsHttpHandler;
