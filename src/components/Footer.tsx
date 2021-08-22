import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'red',
        textAlign: 'center'
    }
}));


export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.footer}>
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography variant="body1" color="inherit">
                            © 2021 Online Casino
                        </Typography>
                    </Toolbar>
                </Container>
            </div>
        </div>
    );
}
