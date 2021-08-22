import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Grid, Paper} from "@material-ui/core";

const SLOT_SIZE: number = 3
const MIN: number = 1
const MAX: number = 9
const DEBUG_NUMBERS: Array<number> = [7, 7, 7]
const PAIR_COST: number = 0.5
const THREE_COST: number = 5
const SEVEN_COST: number = 10

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 1000,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

const useStylesGrid = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 10,
        },
        paper: {
            padding: theme.spacing(5),
            textAlign: 'center',
            fontSize: '64px'
        },
    }),
);

const useStylesButton = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            marginTop: 40,
            textAlign: 'center'
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

function getRandomNumberArray() {
    let oneLine: Array<number>
    let resultMatrix: Array<Array<number>> = []
    for (let i = 0; i < SLOT_SIZE; ++i) {
        oneLine = []
        for (let i = 0; i < SLOT_SIZE; ++i) {
            oneLine.push(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN)
        }
        resultMatrix.push(oneLine)
    }
    return resultMatrix
}


function lineCost(line: Array<number>) {
    let countEqual = line.length - new Set(line).size + 1
    if (countEqual === 2) {
        return PAIR_COST
    }
    if (countEqual === SLOT_SIZE) {
        return line[0] !== 7 ? THREE_COST : SEVEN_COST
    }
    return 0
}

function getSpinCost(resultMatrix: Array<Array<number>>) {
    let spinCost = 0
    resultMatrix.forEach(line => {
        spinCost += lineCost(line)
    })
    return spinCost
}

function getTime() {
    const dt = new Date();

    return `${
        (dt.getMonth() + 1).toString().padStart(2, '0')}/${
        dt.getDate().toString().padStart(2, '0')}/${
        dt.getFullYear().toString().padStart(4, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`
}


export default function Play(props: any) {
    const {close, balance, setBalance, pushRow} = props
    const classes = useStyles();
    const gridClasses = useStylesGrid();
    const buttonClasses = useStylesButton();
    const [modalStyle] = React.useState(getModalStyle);
    const [numbers, setNumbers] = React.useState([[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
    const [spinCost, setSpinCost] = React.useState(0);

    const spin = (debug: boolean = false) => {
        let numbers = getRandomNumberArray()
        if (debug) {
            numbers[1] = DEBUG_NUMBERS
        }
        let spinCost = getSpinCost(numbers)
        let currentBalance = balance - 1 + spinCost
        setSpinCost(spinCost)
        setBalance(currentBalance)
        setNumbers(numbers);
        let row = {
            time: getTime(),
            slot1: numbers[0].toString(),
            slot2: numbers[1].toString(),
            slot3: numbers[2].toString()
        }
        pushRow(row)
    };


    function FormRow(numbers: Array<number>) {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={gridClasses.paper}>{numbers[0]}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={gridClasses.paper}>{numbers[1]}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={gridClasses.paper}>{numbers[2]}</Paper>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <div className={gridClasses.root}>
                <Grid container spacing={5}>
                    <Grid container item xs={12} spacing={5}>
                        {FormRow(numbers[0])}
                    </Grid>
                    <Grid container item xs={12} spacing={5}>
                        {FormRow(numbers[1])}
                    </Grid>
                    <Grid container item xs={12} spacing={5}>
                        {FormRow(numbers[2])}
                    </Grid>
                </Grid>
            </div>
            <div className={buttonClasses.root}>
                <Button variant="contained" color="primary" onClick={() => spin()}>Spin</Button>
                <Button variant="contained" color="primary" onClick={() => spin(true)}>Debug</Button>
                <Button variant="contained" color="primary" onClick={close}>Close</Button>
                <div>
                    <Button>Balance {balance}$</Button>
                    {' '}
                    <Button color={spinCost ? "secondary" : undefined}>Spin Win {spinCost}$</Button>
                </div>
            </div>
        </div>
    );
}
