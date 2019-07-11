import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../../user/user.service';
import {RoutesService} from '../../routes.service';
import {Router} from '@angular/router';
import {UserMembership} from '../../../models/user-membership';
import {Subscription} from 'rxjs';
import {QuerySnapshot} from '@angular/fire/firestore';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit, OnDestroy {
  teams: Array<UserMembership>;

  membershipSub: Subscription;

  constructor(public userService: UserService, public routeService: RoutesService, public router: Router) {
  }

  ngOnInit() {
    this.loadUserMemberships();
  }

  ngOnDestroy() {
    if (this.membershipSub) {
      this.membershipSub.unsubscribe();
    }
  }

  loadUserMemberships() {
    this.membershipSub = this.userService.getUserMemberships$().subscribe(
      (teamQuery: QuerySnapshot<UserMembership>) => {
        this.teams = teamQuery.docs.map((d) => {
          return d.data() as UserMembership;
        });
      }
    );
  }

}
