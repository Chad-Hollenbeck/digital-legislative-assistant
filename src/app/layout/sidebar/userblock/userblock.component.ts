import {Component, OnInit} from '@angular/core';

import {UserblockService} from './userblock.service';
import {AuthService} from '../../../routes/auth/auth.service';
import {UserService} from '../../../routes/user/user.service';
import {QuerySnapshot} from '@angular/fire/firestore';
import {UserMembership} from '../../../models/user-membership';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
  user: any;


  constructor(public userblockService: UserblockService, public authService: AuthService, public userService: UserService) {
    this.user = {};

    this.authService.getUserAccount$().subscribe((authData) => {
      if (!!authData) {
        // Pull Current User
        this.userService.getUserProfile$().subscribe(userProfile => {
          this.userService.getUserMemberships$().subscribe(
            (membershipQuery: QuerySnapshot<UserMembership>) => {
              this.user = {
                picture: 'assets/img/angular.svg',
                profile: userProfile,
                memberships: membershipQuery.docs.map((d) => {
                  return d.data() as UserMembership;
                })
              };
            });
        });
      }
    });
  }

  ngOnInit() {


  }

  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }

}
