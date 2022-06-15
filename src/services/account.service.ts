import BaseService from "./base.service"
import Constants from "src/constants"

class AccountService extends BaseService {
    public updateProfile = async (id: string, email: string, phoneNumber: string): Promise<any> => {
        const result = await this.api.post({
            data: {
                id,
                email,
                phoneNumber
            },
            path: Constants.ApiPath.UPDATE_ACCOUNT,
        })
        return result.data
    }
    public updatePassword = async (id: string, oldPassword: string, newPassword: string) => {
        const result = await this.api.post({
            data: {
                id,
                oldPassword,
                newPassword
            },
            path: Constants.ApiPath.UPDATE_PASSWORD,
        })
        return result.data
    }
}

export default AccountService;