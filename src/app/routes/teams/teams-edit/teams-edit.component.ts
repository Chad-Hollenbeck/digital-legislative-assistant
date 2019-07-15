import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../routes.service';
import { TeamsService } from '../teams.service';
import { ToasterService } from 'angular2-toaster';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DocumentReference } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit, OnDestroy {

  team: Team;
  subs: Array<Subscription>;
  teamFG: FormGroup;
  loading = true;
  submitting = false;
  isNew = false;

  constructor(builder: FormBuilder,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public routeService: RoutesService,
    public teamService: TeamsService,
    public toaster: ToasterService,
    public authService: AuthService) {

    this.teamFG = builder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.team = new Team();
    this.subs = [];
  }

  ngOnInit() {
    this.subs.push(this.activeRoute.paramMap.subscribe(
      (val) => {
        if (val.keys.length > 0) {
          if (val.get('uid') === 'new') {
            // Addition
            this.isNew = true;
            this.loading = false;
          } else {
            // Update
            this.subs.push(this.teamService.getTeamById(val.get('uid')).subscribe(
              (teamVal) => {
                this.team = teamVal as Team;
                this.mapTeamToForm();
                this.loading = false;
              },
              (err) => {
                console.log(err);
                this.toaster.popAsync('danger', '', 'The specified team could not be found. Please try again.');
                this.router.navigateByUrl(this.routeService.ROUTES.teams);
              }
            ));
          }
        } else {
          // No params: err
          this.router.navigateByUrl(this.routeService.ROUTES.teams);
        }
      }
    ));
  }

  ngOnDestroy() {
    _.each(this.subs, (sub) => {
      sub.unsubscribe();
    });
  }

  mapFormToTeam() {
    this.team.name = this.teamFG.controls['name'].value;
    this.team.description = this.teamFG.controls['description'].value;
  }

  mapTeamToForm() {
    this.teamFG.controls['name'].setValue(this.team.name);
    this.teamFG.controls['description'].setValue(this.team.description);
  }

  updateTeam() {
    if (this.isNew) {
      this.mapFormToTeam();

      // create members list.
      this.team.memberIds = [this.authService.getUserUID()];

      this.teamService.addTeam(this.team).then(
        (val: DocumentReference) => {
          this.team.uid = val.id;
          this.teamService.updateTeam(this.team).then(
            () => {
              this.toaster.popAsync('success', null, 'Team Created');
            }
          )
        }
      )
    } else {
      // update
      this.mapFormToTeam();

      this.teamService.updateTeam(this.team).then(
        () => {
          this.toaster.popAsync('success', '', 'Team updated');
        }
      )
    }
  }

  saveMemberAction(identifier: string, action: string) {
    this.teamService.saveMemberAction({ identifier: identifier, action: action, teamId: this.team.uid }).then(
      () => {
        this.toaster.popAsync('success', '', 'Team updated');
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
