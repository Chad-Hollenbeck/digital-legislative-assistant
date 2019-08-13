import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutesService } from '../../routes.service';
import { Router } from '@angular/router';
import { QuerySnapshot } from '@angular/fire/firestore';
import { UserTeamVM } from '@models/user-team-vm';
import { TeamsService } from '@features/teams/teams.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit, OnDestroy {
    teams: Array<UserTeamVM>;
    teamsSup: Array<Subscription>;

    constructor(public teamService: TeamsService, public routeService: RoutesService, public router: Router) {

    }


    ngOnInit() {
        this.loadUserMemberships$();
    }

    ngOnDestroy() {

    }

    loadUserMemberships$() {
        this.teamService.getUsersTeams$().then(
            (value: QuerySnapshot<UserTeamVM>) => {
                this.teams = value.docs.map((d) => d.data() as UserTeamVM);
            }
        );
    }
}
