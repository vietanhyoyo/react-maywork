import { Button, Grid } from "@mui/material";
import { useState } from "react";
import TextInput from "src/components/TextInput";
import Strings from "src/constants/strings";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");

    const onChangeEmail = (value: string) =>{
        setEmail(value);
    }

    const onSubmit = (e: any) =>{
        try {
            e.preventDefault();
            console.log("Email: ", email);
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    return (
        <Grid container justifyContent="center"style={{ height: "100vh" }}>
            <Grid item xs={12} md={4} className="mx-4">
                <form onSubmit={onSubmit} className="d-flex flex-column justify-content-center align-items-center">
                    <TextInput
                        required
                        type="email"
                        containerClassName="mt-5"
                        //errorMessage={}
                        onChangeValue={onChangeEmail}
                        placeholder={Strings.Auth.EMAIL}
                        label={Strings.Auth.EMAIL}
                        isOutline
                    />

                    <Button 
                        className="mt-3 w-50"
                        variant="contained"
                        type="submit"
                        style={{ fontWeight: "bold" }}
                    >
                    {Strings.Common.CONFIRM}
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default ForgotPasswordScreen