import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import * as _ from 'lodash';
import {UserProfile} from '@models/user-profile.model';
import {RoutesService} from '@features/routes.service';
import {QuerySnapshot} from '@angular/fire/firestore';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent implements OnInit {

  users: Array<UserProfile> = [];
  rs: RoutesService;

  constructor(private userService: UserService, routeService: RoutesService) {
    this.rs = routeService;
  }

  ngOnInit() {
    this.userService.getUsers$().subscribe(
      (querySnapshot: QuerySnapshot<UserProfile>) => {
        const userListData = querySnapshot.docs.map((val) => {
          return val.data() as UserProfile;
        });
       this.users = _.sortBy(userListData, 'email');
      });
  }


}
