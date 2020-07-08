import request from 'supertest';
import app from '../../app';
import bootstrap from '../../bootstrap';
import {createUser} from '../crud';
import * as urls from '../urls';

beforeAll(async () => {
  await bootstrap();
});

describe('Test login flow', () => {
  it("Check for empty body sent", async done => {
    const agent = await request(app);
    const response = await agent.post(urls.LOGIN);
    expect(response.status).toBe(400);
    done();
  });

  it("Check for missing username", () => {
    return request(app).post(urls.LOGIN).send({"password": 123}).expect(400);
  });


  it("Check errors shape", () => {
    return request(app).post(urls.LOGIN).expect(400).then(response => {
      expect(response.body).toStrictEqual({"errors": [{"username": "Invalid value"}, {"password": "Invalid value"}]});
    });
  });

  it("Check correct params", async () => {
    await createUser({
      password: '12345',
      username: 'tester2',
    });

    return request(app).post(urls.LOGIN)
      .send({
        'username': 'tester2',
        'password': '12345',
      })
      .expect(200)
      .then(response => {
        expect(response.body.accountInfo.username).toBe('tester2');
        expect(response.body.accessToken.length).toBeGreaterThan(5);
      });
  });
});
