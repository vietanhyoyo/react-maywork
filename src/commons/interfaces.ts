export interface IRequest {}

export interface IResult {
    response: any;
    data: any;
}

export interface IError {
    code: string;
    message?: string;
    extras?: any;
}

export interface IInput {
    value?: any;
    error?: string;
}

export interface IUserInfo {
    id?: string,
    userName?: string,
    email?: string,
    phoneNumber?: string,
    roleCode?: number
}

export interface IUserReport {
    id?: string,
    status?: number,
    userId?: string,
    workingDate?: number,
    description?: string,
    startTime?: number,
    endTime?: number,
    actualTime?: number,
    effectiveTime?: number,
    isDelete?: number,
    organizationId?: string,
    teamId?: string,

    createTime: number,
    createUser?: string,
    updateTime?: number,
    updateUser?: string,
}

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