import Constants from "src/constants"
import BaseService from "./base.service"

class HomeService extends BaseService {
    public getUserReportTotalTime = async (fromDate: number, toDate: number) => {
        const result = await this.api.post({
            path: Constants.ApiPath.USER_REPORT_TOTAL_TIME,
            data: {
                fromDate,
                toDate
            }
        })
        return result.data
    }
}

export default HomeService