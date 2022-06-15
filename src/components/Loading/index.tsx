import CircularProgress from "@mui/material/CircularProgress"
import Constants from "src/constants"

interface IProps {
    color?: string;
}

const Loading = (props: IProps) => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <CircularProgress style={{ color: props.color || Constants.Styles.BLACK_COLOR }} />
        </div>
    )
}

export default Loading