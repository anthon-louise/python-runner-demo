test('executes print("hello") successfully', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({ code: 'print("hello")' });
  
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.output).toContain('hello');
}, 20000);


test('returns complete JSON response', async () => {
  const res = await request(app)
    .post('/api/run-python')
    .send({ code: 'print("test")' });
  
  expect(res.body).toHaveProperty('success');
  expect(res.body).toHaveProperty('output');
  expect(res.body).toHaveProperty('status');
  expect(typeof res.body.success).toBe('boolean');
}, 20000);