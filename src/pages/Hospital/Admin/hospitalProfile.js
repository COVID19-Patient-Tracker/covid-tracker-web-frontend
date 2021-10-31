import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Grid, Box, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';



import { useAuth } from "../../../components/AuthConext"
import styles from '../../../App.module.css';
import { getRequest } from '../../../api/utils';
import * as routes from "../../../shared/BackendRoutes";


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "-webkit-center",
    },
    rootBox: {
        background: 'linear-gradient(45deg, #ccebeb 30%, #4fd2f5 90%)',
    },
    btn: {
        background: 'linear-gradient(45deg, #1c7e98 30%, #1c7e98 90%)',
    },
}));

export default function HospitalProfile() {

    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}}
    const classes = useStyles();
    const auth = useAuth();
    const [hospitalInfo,sethospitalInfo] = React.useState(null) // includes all hosital details
    // hospital statistics are here
    const [infoLoaded, setinfoLoaded] = React.useState(false)

    React.useEffect(() => {
        const user_id = {
            "id":auth.currentUser.id,
        }

        // made request to the backend
        getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id,headers)
            .then((response) => {
                console.log(response)
                if(response.data){
                    sethospitalInfo(response.data.Info.hospital[0]);
                    setinfoLoaded(true)
                    
            .catch((e) => {

            });
                }
                else if(response.error){
                    alert(response.error)
                }
            })
            .catch((e) => {

            });
        return () => {
        }
    }, [])


    return (
        <Box className={classes.root} marginTop={18} >
            <Box p={{ xs: 2 }} m={{ xs: 2, sm: 8 }} minHeight={350} maxWidth={1000} border={2} borderRadius={10}>
                <Grid container >
                    <Grid item xs={12} md={5}>
                        <Box className={classes.rootBox} minHeight={400} p={{ xs: 1, sm: 5 }}>
                            <img alt="hospi" src="/assets/image.png" class="responsive" height={300}></img>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box p={{ xs: 2, sm: 6 }}>
                            <form autoComplete="off">
                                <TextField
                                    id="name"
                                    label="Hospital Name"
                                    fullWidth
                                    margin="normal"
                                    value={infoLoaded ? hospitalInfo.name : "loading"}
                                    type="text"
                                    InputProps={{ readOnly: true }}
                                    inputProps={{ minLength: 3, maxLength: 15 }}
                                />
                                <TextField
                                    id="address"
                                    label="Address"
                                    fullWidth
                                    margin="normal"
                                    value={infoLoaded ? hospitalInfo.address : "loading"}
                                    required
                                    type="text"
                                    InputProps={{ readOnly: true }}
                                    inputProps={{ minLength: 5, maxLength: 15 }}
                                />
                                <TextField
                                    id="nic"
                                    label="Telephone"
                                    fullWidth
                                    margin="normal"
                                    value={infoLoaded ? hospitalInfo.telephone : "loading"}
                                    InputProps={{ readOnly: true }}
                                    required
                                />
                                <TextField
                                    id="capacity"
                                    label="Patient Capacity"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    value="9999"
                                    require
                                    InputProps={{ readOnly: true }}
                                />
                                <br></br><br></br>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    className={classes.btn}
                                    size="small"
                                    color="primary"
                                >
                                    Edit Profile
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
