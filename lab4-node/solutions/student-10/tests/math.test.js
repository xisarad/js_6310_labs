
import { sum, multiply } from '../src/utils/index.js';

test('sum works', () => {
  expect(sum(1,2)).toBe(3);
});
test('multiply works', () => {
  expect(multiply(3,4)).toBe(12);
});
