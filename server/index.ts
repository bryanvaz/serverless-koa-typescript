/**
 * Server Entry Point for local development
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { logger } from '@config/logging';
import { env } from '@config/environment';
import { ApplicationServer } from '@app';

const app = new ApplicationServer();
app.listen(env.port);

logger.info(`Server running on port ${env.port}`);
