/**
 * Server Entry Point for local development
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { app } from '../src';
import { logger } from '../src/logging';
import { config } from '../src/config';

app.listen(config.port);

logger.info(`Server running on port ${config.port}`);
