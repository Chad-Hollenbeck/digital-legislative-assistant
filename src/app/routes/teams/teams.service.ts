import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from '@models/team.model';

@Injectable()
export class TeamsService {
  constructor(private afa: AngularFireAuth, private db: AngularFirestore) {
  }

  getUsersTeams$() {
    return this.db.collection('teams').ref.where('memberIds', 'array-contains', this.afa.auth.currentUser.uid).get();
  }

  getTeamById(teamId: string) {
    return this.db.collection('teams').doc(teamId).valueChanges();
  }

  getTeamMembers(teamId: string) {
    return this.db.collection('teams').doc(teamId).collection('member-details').get();
  }

  addTeam(team: Team) {
    return this.db.collection('teams').add(team);
  }

  updateTeam(team: Team) {
    return this.db.collection('teams').doc(team.uid).set(JSON.parse(JSON.stringify(team)));
  }

  saveMemberAction(actionObject: any) {
    return this.db.collection('membership-queue').add(actionObject);
  }
}
