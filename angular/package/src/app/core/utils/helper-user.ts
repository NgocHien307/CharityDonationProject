import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const isJwtToken = (token: string) => {
    if (!token) {
      return false;
    }

    // JWT tokens have three parts separated by dots
    const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    return jwtPattern.test(token);
  };

  export const convert = (str: any, past?: number) => {
    var date = new Date(str);
    let mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    if (past && date.getDate()) {
      day = ('0' + (date.getDate() - past)).slice(-2);
    }
    return [date.getFullYear(), mnth, day].join('-');
  };
  export const getCookie = (cname: any): string => {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };
  export const setCookieSetting = (key: any, value: string): void => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    document.cookie = key + '=' + value + ';expires=' + date + '; path=/;';
  };

  export function noSpecialChars(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-zA-Z0-9]*$/;

    if (control.value && !regex.test(control.value)) {
      return { 'specialChars': true };
    }
    return null;
  }
  export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return { passwordsMismatch: true }; // Lỗi nếu mật khẩu không khớp
      }
      return null; // Hợp lệ
    };
  }
