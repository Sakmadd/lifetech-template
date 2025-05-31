import http_app from './app';
import { ENV } from './config/environment';
import logger from './utils/logger';

http_app.listen(ENV.HTTP_PORT, () => {
  logger.info(`Server HTTP running on port ${ENV.HTTP_PORT}`);
});
