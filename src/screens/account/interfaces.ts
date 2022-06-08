export interface IUserSetting {
  id?: string;
  teamId?: string;
  teamName?: string;
  organizationId?: string;
  organizationName?: string;
}

export interface IOrganizationList {
  id?: string;
  name?: string;
  status?: number;
  description?: string;
  createTime?: number;
}
export interface ITeamList {
  id?: string;
  name?: string;
  status?: number;
  description?: string;
  gene?: string;
  createTime?: number;
}
