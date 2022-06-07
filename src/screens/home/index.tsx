import { useSelector } from "react-redux"
import { RootState } from "src/store"

const HomeScreen = () => {
    const userInfo = useSelector((state: RootState) => state.userInfo.value)
    return (
        <div>
            HOME
        </div>
    )
}

export default HomeScreen