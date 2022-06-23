import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';
import * as assert from 'assert';
import RespData from '../../src/dto/response.dto';

describe('test/controller/user.test.ts', () => {
  // create app
  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  // 添加用户
  it('should GET /user/add', async () => {
    // make request
    const result = await createHttpRequest(app).get('/user/add');
    const { body } = result;

    expect(body.code).toBe(200);
    expect(body.result).toEqual('success');
  });

  // 正常登录测试
  it('should POST /user/login', async () => {
    const start = new Date().getTime();
    // make request
    const user = { username: 'jack', password: 'redballoon' };
    const result = await createHttpRequest(app).post('/user/login').send(user);
    const end = new Date().getTime();

    const cost = (end - start) / 1000;
    expect(cost).toBeLessThan(1);

    const { body } = result;
    assert.deepStrictEqual(body.code, 200);
    assert.deepStrictEqual(body.result, 'success');
  });

  // 异常登录测试
  it('should POST /user/login', async () => {
    const start = new Date().getTime();
    // make request
    const user = { username: 'jack22', password: 'redballoon' };
    const result = await createHttpRequest(app).post('/user/login').send(user);
    const end = new Date().getTime();

    const cost = (end - start) / 1000;
    expect(cost).toBeLessThan(1);

    const { body } = result;

    assert.deepStrictEqual(body.code, 400);
    assert.deepStrictEqual(body.result, 'error');
  });
});
