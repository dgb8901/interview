import { MidwayConfig } from '@midwayjs/core';
import UserEntity from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655804072585_5917',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  },
  jwt: {
    enable: true,
    expiresIn: '10d',
    secret: '12345678',
  },
} as MidwayConfig;
