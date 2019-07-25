import { TeamMember } from "./team-member.model";

export class Team {
	uid: string;
	name: string;
	description: string;
	members: Array<TeamMember>;
}
