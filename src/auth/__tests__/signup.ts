import request from 'supertest';
import app from '../../app';
import bootstrap from '../../bootstrap';
import * as urls from '../urls';

beforeAll(async () => {
  await bootstrap();
});

describe('Test signup flow', () => {
  it("Check for wrong body sent", async done => {
    const agent = await request(app);
    const response = await agent.post(urls.SIGNUP);
    expect(response.status).toBe(400);
    done();
  });

  it("Check for missing username", () => {
    return request(app).post(urls.SIGNUP).send({"password": 123}).expect(400);
  });


  it("Check errors shape", () => {
    return request(app).post(urls.SIGNUP).expect(400).then(response => {
      expect(response.body).toStrictEqual({"errors": [{"username": "Invalid value"}, {"password": "Invalid value"}]});
    });
  });

  it("Check correct params", () => {
    return request(app).post(urls.SIGNUP)
      .send({
        'username': 'tester',
        'password': 'testers_password',
      })
      .expect(201)
      .then(response => {
        expect(response.body.accountInfo.username).toBe('tester')
      });
  });
});
