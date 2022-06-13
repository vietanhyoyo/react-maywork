import BaseService from "./base.service"

class AccountService extends BaseService {
    public updateProfile = async (id: string, email: string, phoneNumber: string, token: string): Promise<any> => {
        const result = await this.api.post({
            data: {
                id,
                email,
                phoneNumber
            },
            path: "/user/update",
            headers: {
                "x-access-token": token
            }
        })
        return result.data
    }
    public updatePassword = async (id: string, oldPassword: string, newPassword: string, token: string) => {
        const result = await this.api.post({
            data: {
                id,
                oldPassword,
                newPassword
            },
            path: "auth/changePass",
            headers: {
                "x-access-token": token
            }
        })
        return result.data
    }
}

export default AccountService;