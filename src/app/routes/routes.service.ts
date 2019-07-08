import {Injectable} from '@angular/core';

@Injectable()
export class RoutesService {

  ROUTES = {
    home: '/home',
    login: '/a/login',
    logout: '/a/logout',
    terms: '/a/terms',
    register: '/a/register',
    forgotPassword: '/a/reset-password',
    users: '/u',
    editUser: '/u/'
  };

  /*Menu Parts*/
  menuLinks = {
    headingMain: {
      text: 'Main Navigation',
      heading: true
    },
    logout: {
      text: 'Log Out',
      link: this.ROUTES.logout,
      icon: 'fa fa-sign-out-alt'
    },
    users: {
      text: 'Users',
      link: this.ROUTES.users,
      admin: true,
      icon: 'fa fa-users'
    },
    dashboard: {
      text: 'Dashboard',
      link: this.ROUTES.home,
      admin: false,
      icon: 'fa fa-chart-bar'
    }
  };


  constructor() {
  }

  byName(name) {
    return (this.ROUTES[name] || '/home');
  }

  /*Menu*/
  getMenu() {

    return [
      this.menuLinks.headingMain,
      this.menuLinks.dashboard,
      this.menuLinks.users,
      this.menuLinks.logout
    ];
  }

}
