const request = require('supertest');
const app = require('../server');

test('rejects empty code input', async () => {
  const res = await request(app).post('/api/run-python').send({ code: '' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Code is required');
});

test('blocks unsafe Python imports', async () => {
  const res = await request(app).post('/api/run-python').send({code: 'import os\nprint("hack")'});

  expect(res.status).toBe(403);
  expect(res.body.error).toBe('Unsafe imports blocked');
});

test('handles long-running execution safely', async () => {
  const res = await request(app).post('/api/run-python').send({code: 'while True:\n pass'});

  expect([200, 500]).toContain(res.status);

  if (res.status === 500) {
    expect(res.body.error).toBeDefined();
  }
}, 20000);