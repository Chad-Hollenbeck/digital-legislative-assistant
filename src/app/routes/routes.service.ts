import {Injectable} from '@angular/core';
import {ROUTES} from './routes.enum';

@Injectable()
export class RoutesService {



  /*Menu Parts*/
  menuLinks = {
    headingMain: {
      text: 'Main Navigation',
      heading: true
    },
    logout: {
      text: 'Log Out',
      link: ROUTES.logout,
      icon: 'fa fa-sign-out-alt'
    },
    users: {
      text: 'Users',
      link: ROUTES.users,
      admin: true,
      icon: 'fa fa-users'
    },
    dashboard: {
      text: 'Dashboard',
      link: ROUTES.home,
      admin: false,
      icon: 'fa fa-chart-bar'
    },
    profile: {
      text: 'My Profile',
      link: ROUTES.profile,
      admin: false,
      icon: 'fa fa-user'
    },
    locations: {
      text: 'Locations',
      link: ROUTES.meetingLocations,
      admin: false,
      icon: 'fa fa-building'
    },
    teams: {
      text: 'Teams',
      link: ROUTES.teams,
      admin: false,
      icon: 'fa fa-users'
    }
  };


  constructor() {
  }


  /*Menu*/
  getMenu() {
    return [
      this.menuLinks.headingMain,
      this.menuLinks.dashboard,
      this.menuLinks.users,
      this.menuLinks.locations,
      this.menuLinks.logout
    ];
  }

}
