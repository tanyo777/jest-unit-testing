export enum PasswordErrors {
  SHORT = 'Password must be atleast 8 characters!',
  NO_UPPERCASE = 'Password must include atleast one uppercase letter!',
  NO_LOWERCASE = 'Password must include atleast one lowercase letter!',
  NO_NUMBER = 'Admin password must include atleast one number!',
}

export default class PasswordChecker {
  private checkPasswordLength(password: string) {
    if (password.length < 8) {
      throw Error('Password must be atleast 8 characters!');
    }
  }

  private checkPasswordForLowerCase(password: string) {
    if (password == password.toLowerCase()) {
      throw Error('Password must include atleast one uppercase letter!');
    }
  }

  private checkPasswordForUpperCase(password: string) {
    if (password == password.toUpperCase()) {
      throw Error('Password must include atleast one lowercase letter!');
    }
  }

  private checkAdminPasswordForANumber(password: string) {
    if (!/\d/.test(password)) {
      throw Error('Admin password must include atleast one number!');
    }
  }

  checkPassword(password: string): boolean {
    this.checkPasswordLength(password);

    this.checkPasswordForLowerCase(password);

    this.checkPasswordForUpperCase(password);

    return true;
  }

  checkAdminPassword(password: string): boolean {
    this.checkPassword(password);
    this.checkAdminPasswordForANumber(password);
    return true;
  }
}
