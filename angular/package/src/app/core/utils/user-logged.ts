import { first, last } from "rxjs";

export class UserLogged {
    private readonly TOKENKEY: string = 'token';
    private readonly ROLEKEY: string = 'role';
    // private readonly TypeKey: string = 'type';

    constructor() {
      this.TOKENKEY = 'token';
      this.ROLEKEY = 'role';
      // this.userPermissionKey1 = 'userPermission1';
    }
    getToken(): string {
        console.log(this.getCookie(this.TOKENKEY));
      return this.getCookie(this.TOKENKEY);
    }
    getRoles() {
      const result: any = [];
      let roles: any = [];
      console.log("JSON.parse(this.getCookie(this.ROLEKEY)",JSON.parse(this.getCookie(this.ROLEKEY)));
      try {
        roles = JSON.parse(this.getCookie(this.ROLEKEY));
      } catch (err) {
        roles = this.getCookie(this.ROLEKEY);
      }
      try {
        roles.forEach((role: any) => {
          result.push((role as string).trim().toLowerCase());
        });
      } catch (error) {}
      console.log("rolket",result);
      return result;
    }
    getCurrentUser(): any {
      let role = this.getCookie(this.ROLEKEY);
      let token = this.getCookie(this.TOKENKEY);
      // let type = this.getCookie(this.TypeKey);


      return {
        role: role,
        token: token,
        // type :type
        // userPermission1: userPermission1,
      };
    }
    setCurrentUser(
      token: string,
      role: string,
      // type : string
    ): void {
      this.setCookie(this.TOKENKEY, token);
      this.setCookie(this.ROLEKEY, role);
      // this.setCookie(this.TypeKey, type);

    }

    saveToken(token: string) {
      this.setCookie(this.TOKENKEY, token);
    }

    isLogged(): boolean {
      let token = this.getCookie(this.TOKENKEY);
      // const helper = new JwtHelperService();
      if (token === '' || token === null) return false;
      else return true;
    }
    logout(): void {
      this.deleteCookie(this.TOKENKEY);
      this.deleteCookie(this.ROLEKEY);
      // this.deleteCookie(this.TypeKey);

      // this.deleteCookie(this.userPermissionKey1);
    }
    private deleteCookie(key: any): void {
      document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    private setCookie(key: string, value: string): void {
      document.cookie = key + '=' + value + ';path=/';
    }
    private getCookie(cname: any): string {
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
    }
  }
