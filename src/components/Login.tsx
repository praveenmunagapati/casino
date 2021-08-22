import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            textAlign: 'center',
            position: 'absolute',
            width: 300,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2, 4, 3),
        },
    }),
);


function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function Login(props: any) {
    const {close, setUserName, userName} = props
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [userNameInput, setUserNameInputValue] = React.useState(userName)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserNameInputValue(event.target.value);
    }
    const handleLogin = () => {
        setUserName(userNameInput)
        close()
    }

    const handleLogOut = () => {
        setUserName("")
        close()
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <div>
                <TextField
                    id="outlined-name"
                    label="User Name"
                    value={userNameInput}
                    onChange={handleChange}
                    variant="outlined"
                />
            </div>
            <div style={{marginTop: '15px'}}>
                {userName ?
                    <Button onClick={handleLogOut} variant="outlined" color="secondary">
                        Log Out
                    </Button> :
                    <Button onClick={handleLogin} variant="outlined" color="secondary">
                        Log In
                    </Button>
                }
                {' '}
                <Button onClick={close} variant="outlined" color="secondary">
                    Cancel
                </Button>
            </div>
        </div>
    );
}
