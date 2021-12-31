import {NumberFormater} from '@src/utils/numbers';
describe('testing formatting long numbers to a representative text', () => {
  it('should convert (N) thousands numbers to (N) K ', () => {
    const N = 1000;
    expect(NumberFormater(N)).toBe(N / 1000 + ' K');
  });
  it('should convert (N) Millions numbers to (N) M ', () => {
    const N = 1000000;
    expect(NumberFormater(N)).toBe(N / 1000000 + ' M');
  });
  it('should convert (N) Billions numbers to (N) B ', () => {
    const N = 1000000000;
    expect(NumberFormater(N)).toBe(N / 1000000000 + ' B');
  });
});
