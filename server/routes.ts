import * as Router from 'koa-router';
import controller = require('./controllers');

const router = new Router();

// GENERAL SAMPLE ROUTES
router.get('/', controller.general.helloWorld);
router.get('/env-test', controller.general.envTest);

export { router };