import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let getItemKey = sessionStorage.getItem(TOKEN_KEY);
    if (getItemKey)
      return getItemKey;
    else return '';
  }

  public saveUser(user: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let getItemKey = sessionStorage.getItem(USER_KEY);
    if (getItemKey) {
      console.log(getItemKey);
      return JSON.parse(getItemKey);
    }
    else return JSON.parse('{}');
  }

}
