import 'reflect-metadata';

import { Container } from 'typedi';

import { Database } from '../db/database';

module.exports = async () => {
  const db = Container.get(Database);
  await db.reset();
};
