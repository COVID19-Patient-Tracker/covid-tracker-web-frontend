import React, { useState } from 'react';

import {CardsHospitalUser, ChartHospitalUser,ChartTotal,CardsTotal} from '../../components';
import styles from '../../App.module.css';
import {fetchData,fetchTotalData} from '../../api/index.js';
import {HeaderContentHospitalUser} from '../../components/HeaderContent'; 
import { useAuth } from '../../components/AuthConext';
import { getRequest } from '../../api/utils';
import * as routes from "../../shared/BackendRoutes";

class UserManagement extends React.Component {

    state = {
        data: {},
        dataTotal:{}
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        const fetchedTotalData = await fetchTotalData();
        const user = JSON.parse(localStorage.getItem(`CPT-user-details`));
        const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
        const headers = {headers:{"Authorization": `${JWTtoken}`}}
        const response = await getRequest(routes.GETHOSPITALUSERDETAILS + user.id,headers);console.log(response)
        const statisticsResponse = await getRequest(routes.GET_STATISTICS + response.data.Info.hospital[0].hospital_id,headers)
        this.setState({data:fetchedData, dataTotal:fetchedTotalData, hospitalInfo:response.data.Info.hospital[0], statisticsResponse: response.data.statistics})
    }
    render() {
        const {data} = this.state;
        const {dataTotal} = this.state;
        const {hospitalInfo} = this.state;
        return ( 
            <React.Fragment>
                {hospitalInfo ? <HeaderContentHospitalUser props={hospitalInfo}/> : "loading"}
                <div>
                    <img src="/assets/userback2.svg" alt='' style={{ backgroundSize:'cover',width: "100%", backgroundRepeat:'no-repeat'}} />
                </div>
                <div className={styles.user_container}>
                    <CardsHospitalUser />
                    <ChartHospitalUser/>
                    <CardsTotal data={dataTotal}/>
                    <ChartTotal data={dataTotal} /> 
                </div>
                <br/><br/><br/><br/><br/>
        </React.Fragment>
        );
    }
}

export default UserManagement;

