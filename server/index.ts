/**
 * Server Entry Point for local development
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { logger } from '@app/logging';
import { config } from '@app/config';
import { app } from '@app';

app.listen(config.port);

logger.info(`Server running on port ${config.port}`);
