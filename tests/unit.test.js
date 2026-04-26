test('rejects empty code input', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({ code: '' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Code is required');
});

test('blocks unsafe Python imports', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({
      code: 'import os\nprint("hack")'
    });

  expect(res.status).toBe(403);
  expect(res.body.error).toBe('Unsafe imports blocked');
});