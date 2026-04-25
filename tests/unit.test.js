test('shows "(no output)" when result is empty', () => {
  const format = (out) => out || '(no output)';
  expect(format(null)).toBe('(no output)');
  expect(format('')).toBe('(no output)');
  expect(format('Hello')).toBe('Hello');
});


test('formats execution time to 3 decimals', () => {
  const fmt = (s) => parseFloat(s).toFixed(3) + 's';
  expect(fmt(0.1)).toBe('0.100s');
  expect(fmt(1.2346)).toBe('1.235s'); 
});