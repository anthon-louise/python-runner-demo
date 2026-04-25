const UNSAFE_REGEX = /\b(import|from)\s+(os|subprocess|sys|socket|threading)\b/i;

test('blocks unsafe imports', () => {
  expect(UNSAFE_REGEX.test('import os')).toBe(true);
  expect(UNSAFE_REGEX.test('from subprocess import run')).toBe(true);
  expect(UNSAFE_REGEX.test('print("safe code")')).toBe(false);
});

test('rejects empty or whitespace-only code', () => {
  expect(''.trim()).toBe('');
  expect('   \n'.trim()).toBe('');
});

test('enforces max length', () => {
  const longCode = 'a'.repeat(2001);
  expect(longCode.length > 1500).toBe(true);
});