const request = require('supertest');
const app = require('../server');

test('should execute valid Python and return success', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({ code: "print('integration-test-ok')" })
    .expect('Content-Type', /json/)
    .expect(200);

  expect(res.body.success).toBe(true);
  expect(res.body.output).toContain('integration-test-ok');
}, 20000);

test('should reject code with unsafe imports', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({ code: "import os; print('hack')" })
    .expect(403);

  expect(res.body.error).toMatch(/Unsafe imports blocked/i);
});

test('should reject empty code', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({ code: "   " })
    .expect(400);

  expect(res.body.error).toMatch(/Code is required/i);
});