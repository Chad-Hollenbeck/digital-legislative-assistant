
export class Team {
	uid: string;
	name: string;
	description: string;
	memberIds: Array<string>;
	memberRoles: any; // Map<userId:userRole>
	memberNames: any; // Map<userId:userName>
}
