import PasswordChecker, { PasswordErrors } from './PasswordChecker';

describe('PasswordChecker test suite', () => {
  let passwordChecker: PasswordChecker;

  beforeEach(() => {
    passwordChecker = new PasswordChecker();
  });

  it('Password with less than 8 characters should be invalid', () => {
    try {
      passwordChecker.checkPassword('Tes123');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', PasswordErrors.SHORT);
    }
  });

  it('Password with more than 8 characters is ok', () => {
    try {
      const result = passwordChecker.checkPassword('Test@123');
      expect(result).toBe(true);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('Password with uppercase letter should be ok', () => {
    const result = passwordChecker.checkPassword('Test@123');
    expect(result).toBe(true);
  });

  it('Password without a uppercase letter should throw Error', () => {
    try {
      passwordChecker.checkPassword('test@123');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', PasswordErrors.NO_UPPERCASE);
    }
  });

  it('Password with atleast one lowercase letter should be ok', () => {
    const result = passwordChecker.checkPassword('Test@123');
    expect(result).toBe(true);
  });

  it('Password without a lowercase letter should throw an Error', () => {
    try {
      passwordChecker.checkPassword('TEST@123');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', PasswordErrors.NO_LOWERCASE);
    }
  });

  it('Admin password without number in it should throw an Error', () => {
    function toThrowError() {
      passwordChecker.checkAdminPassword('TeST@eeee');
    }
    expect(toThrowError).toThrowError(PasswordErrors.NO_NUMBER);
  });

  it('Admin password with a number in it should be ok', () => {
    const result = passwordChecker.checkAdminPassword('TeST@1233');

    expect(result).toBe(true);
  });
});
