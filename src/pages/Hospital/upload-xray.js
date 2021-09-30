import React from 'react';
import { useState, useRef } from "react";
import { Grow, LinearProgress, makeStyles, Snackbar } from "@material-ui/core";
import { Box, Typography, Fab, TextField, Button, Grid } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia'
import { Alert } from '@material-ui/lab';
import axios from "axios"
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    resultCont: {
        padding : theme.spacing(2),
    },
}));

export default function UserManagement() {
    const selectFile = useRef(null)
    const [isImageValid, setisImageValid] = useState(false)
    const classes = useStyles();
    const [viewResult, setViewResult] = useState(false);
    const [fileState, setFileState] = useState(null);
    const [state,setState] = useState("NORMAL");
    const [acc,setAcc] = useState(0);
    const [progressbar,setProgrssBar] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [message, setMessage] = useState("success");
    const [level, setLevel] = useState("success");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackBarOpen(false);
      };

    const handleViewResult = () => {
        if(selectFile.current){
            const formData = new FormData()
            formData.append('image', selectFile.current)
            setProgrssBar(true)

            axios.post("https://pneumonia-prediction-sep.herokuapp.com/predict",formData)
            .then((result) => {
                console.log(result);
                const normalAcc = parseFloat(result.data.normal);
                const pneumoniaAcc = parseFloat(result.data.pneumonia)
                if(normalAcc < pneumoniaAcc){
                    setState("PNEUMONIA");
                    setAcc(pneumoniaAcc * 100)
                }else{
                    setState("NORMAL")
                    setAcc(normalAcc * 100)
                }
                setProgrssBar(false)
                setViewResult(true);
                setMessage("Result Arrived")
                setLevel("success")
                setSnackBarOpen(true)
            });
            
        }else{
                setMessage("No file selected")
                setLevel("error")
                setSnackBarOpen(true)
        }

    }

    const getImage = (e) => {

        setisImageValid(false)
        setViewResult(false)

        setTimeout(() => {
            
            selectFile.current = e.target.files[0];
            var fileType = null;

            if(selectFile.current){
                fileType = selectFile.current.type;
            }else{
                setMessage("No file selected")
                setLevel("error")
                setSnackBarOpen(true)
                return
            }

            if( fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg"){
                setisImageValid(true)
                setFileState(URL.createObjectURL(selectFile.current));
            }
            else{
                setMessage("Invalid Image Format")
                setLevel("error")
                setSnackBarOpen(true)
                setisImageValid(false)
                selectFile.current = null
            }
            
        },50)
    }


    return (
        
        <Box p={2} style={{ margin:"150px auto"}}>
            <Typography variant="h5" align="center">Upload X-RAY</Typography>
            <Typography variant="body1" align="center">
                *Upload a clear image of the patients X-Ray with a good resolution. (Accepted File Formats: png,jpeg,jpg)
                </Typography>
            
            <Box textAlign="center" pt={5}
            sx={{
                display:"flex",alignContent:"flex-start",flexDirection:"column", alignItems:"center"
            }}>
                <label htmlFor="upload-photo">
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={getImage}
                    />
                    
                    <Fab
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={level} sx={{ width: '100%' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                        <AddIcon /> Add xray Image
                    </Fab>
                </label>
                <br/>
                <Button
                    style={{
                        borderRadius: "90px",
                        backgroundColor: "#0b99d1",
                        padding: "10px 20px",
                        color:"rgb(255, 255, 255)",
                        margin: "0 auto",
                        fontSize: "15px"
                    }}
                    variant="contained"
                    className={classes.button}
                    onClick={handleViewResult}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
                <br/>    
                {
                    isImageValid && 
                    <Grow
                        in={isImageValid}
                        >
                        <Card >
                            <CardMedia component="img" height="300"  width="300" image={fileState} alt="xr-img"/>
                            { progressbar && <LinearProgress/>}
                        </Card>
                    </Grow>
                }
            </Box>
            {viewResult && (
                <Box
                    border={1}
                    borderRadius={6}
                    p={{ xs: 1, sm: 2 }}
                    m={5}
                >

                    <Typography color="error" variant="body2" gutterBottom>The Predicted result will be displayed here..</Typography>
                    <Grid className={classes.resultCont} container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="date"
                                label="Date"
                                value={new Date()}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="site-name"
                                label="Predicted-Result"
                                value={state}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="site-host"
                                label="Accuracy"
                                value={acc}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}

        </Box>
    )
}

