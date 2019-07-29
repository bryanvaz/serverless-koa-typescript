/**
 * Base Router for the API server
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import * as Router from 'koa-router';

import controller = require('./controllers');

const router = new Router();

// GENERAL SAMPLE ROUTES
router.get('/', controller.general.helloWorld);
router.get('/env-test', controller.general.envTest);
router.post('/square', controller.general.square);

export { router };
