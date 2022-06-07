import React, { useState } from "react";
import {
    InputProps,
    Input as MuiInput,
    OutlinedInput as MuiOutlinedInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { nanoid } from "nanoid"
import Helpers from "../../commons/helpers";

interface IProps extends InputProps {
    errorMessage?: string;
    notification?: any;
    onChangeValue: (value: any) => void;
    secure?: boolean;
    pattern?: string;
    placeholder?: string;
    containerClassName?: string;
    type?: string;
    label?: string;
    isOutline?: boolean;
}

const Input = (props: IProps) => {
    return props.isOutline ? <MuiOutlinedInput {...props} /> : <MuiInput {...props} />
}

const TextInput: React.FC<IProps> = (props: IProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChangeValue = (event: any) => {
        if (props.onChangeValue && Helpers.isFunction(props.onChangeValue)) {
            props.onChangeValue(event.target.value);
        }
    }

    const onShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const inputInstance = () => {
        if (props.secure) {
            return (
                <Input
                    {...props}
                    isOutline={props.isOutline}
                    id={nanoid()}
                    onChange={handleChangeValue}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={onShowPassword}
                                onMouseDown={onMouseDown}
                                edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            )
        }
        return (
            <Input
                {...props}
                isOutline={props.isOutline}
                id={nanoid()}
                onChange={handleChangeValue}
                autoComplete="off"
            />
        );
    }

    return (
        <FormControl
            className={props.containerClassName}
            fullWidth
            variant={props.isOutline ? "outlined" : "standard"}
            error={!Helpers.isNullOrEmpty(props.errorMessage)}
        >
            <InputLabel htmlFor="standard-input">{props.required ? `${props.label} *` : props.label}</InputLabel>
            {inputInstance()}
            <FormHelperText id={nanoid()}>
                {props.errorMessage}
            </FormHelperText>
        </FormControl>
    )
}

export default TextInput