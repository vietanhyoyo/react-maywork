import BaseService from "./base.service"
import Constants from "src/constants"

class UserReportService extends BaseService {
    public getUserReportTotalTime = async (fromDate: number, toDate: number) => {
        const result = await this.api.post({
            path: Constants.ApiPath.FILTER_USER_REPORT,
            data: {
                fromDate,
                toDate
            }
        })
        return result.data
    }

    public deleteUserReport = async (userReportId: string) => {
        const result = await this.api.post({
            path: Constants.ApiPath.DELETE_USER_REPORT,
            data: {
                id: userReportId
            }
        })
        return result.data
    }
}

export default UserReportService