import { utils } from './utils.js';

const { arePasswordsEqual, isPasswordValid, isEmailValid } = utils();

describe('Utils', () => {
  describe('arePasswordsEqual', () => {
    test('returns true when passwords are equal', () => {
      expect(arePasswordsEqual('password', 'password')).toBe(true);
    });
    test('returns false when passwords are not equal', () => {
      expect(arePasswordsEqual('password', 'different')).toBe(false);
    });
  });

  describe('isPasswordValid', () => {
    test('returns true for a valid password', () => {
      expect(isPasswordValid('Password123')).toBe(true);
    });

    test('returns false for an invalid password', () => {
      expect(isPasswordValid('weakpassword')).toBe(false);
    });
  });

  describe('isEmailValid', () => {
    test('returns true for a valid email', () => {
      expect(isEmailValid('test@example.com')).toBe(true);
    });

    test('returns false for an invalid email', () => {
      expect(isEmailValid('invalidemail')).toBe(false);
    });
  });
});
