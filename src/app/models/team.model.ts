import {TeamMembership} from './team-membership.model';

export class Team {
  uid: string;
  name: string;
  description: string;
  ownerUID: string;
  members: Array<TeamMembership>;
}
