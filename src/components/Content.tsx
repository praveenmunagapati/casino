import * as React from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Play from "./Play";
import {makeStyles} from "@material-ui/core/styles";
import Login from "./Login";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function DataTable(props: any) {
    const {balance, setBalance, isLoginOpen, closeLoginModal, userName, setUserName} = props
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const pushRow = (row: any) => {
        row.id = rows.length + 1
        // @ts-ignore
        rows.push(row)
    }

    const classes = useStyles();


    return (
        <div style={{width: '80%', display: 'inline-block'}}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <Play
                        pushRow={pushRow}
                        balance={balance}
                        setBalance={setBalance}
                        close={handleClose}
                    />
                </div>
            </Modal>
            <Modal
                open={isLoginOpen}
                onClose={closeLoginModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <Login
                        setUserName={setUserName}
                        userName={userName}
                        close={closeLoginModal}
                    />
                </div>
            </Modal>
            <div style={{marginTop: '20px'}}>
                <Button onClick={handleOpen} variant="outlined" color="secondary">
                    Start Game
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Slot 1</TableCell>
                            <TableCell>Slot 2</TableCell>
                            <TableCell>Slot 3</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell component="th" scope="row">{row.time}</TableCell>
                                <TableCell component="th" scope="row">{row.slot1}</TableCell>
                                <TableCell component="th" scope="row">{row.slot2}</TableCell>
                                <TableCell component="th" scope="row">{row.slot3}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}