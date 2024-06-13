import { Injectable } from '@angular/core';

const data = {
  GlobalService: {
    appName: 'KAMIWorkforce',
  },
  description:
    "For a quicker and more secure login, you can click the Login with GitHub button. This will redirect you to GitHub to authorize access. Once approved, you'll be automatically logged in to our platform.",
  login: {
    label: 'login',
  },
  logout: {
    label: 'logout',
  },
};

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public appName: string = data.GlobalService.appName;
  public description: string = data.description;
  public login: string = data.login.label;
  public logout: string = data.logout.label;
  constructor() {}
}
