import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Header(props: any) {
    const classes = useStyles();
    const {balance, openLoginModal, userName} = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SlowMotionVideoIcon/>
                        <div>
                            {"nline Casino"}
                        </div>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                    <div>
                        {balance}$
                    </div>
                    <div>
                        <Person style={{cursor: "pointer"}} onClick={openLoginModal}/>
                    </div>
                    <div>
                        {userName}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
