import React from 'react';

import {CardsMOHUser, ChartMOHUser,ChartTotal,CardsTotal} from '../../components';
import styles from '../../App.module.css';
import {fetchData,fetchTotalData} from '../../api/index.js';
import {HeaderContentMOH} from '../../components/HeaderContent'; 
import GroupedSearch from '../../components/MOH/dashboard/ws';
import * as routes from '../../shared/BackendRoutes'
import { getRequest } from '../../api/utils';
import Spinner from '../../components/Spinner';
class UserManagement extends React.Component {

    state = {
        data: {},
        dataTotal:{},
        hosInfos:[{}]
    }
    async componentDidMount() {
        const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
        const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
        const fetchedData = await fetchData();
        const fetchedTotalData = await fetchTotalData();
        const getAllHospitals = await getRequest(routes.GET_ALL_HOSPITALS_URL,headers)
        this.setState({data:fetchedData, dataTotal:fetchedTotalData, hosInfos:getAllHospitals.data.hospitals})
    }
    render() {
        const {dataTotal,hosInfos} = this.state;
        
        
        return ( 
            <React.Fragment>
                <HeaderContentMOH/>
                <div>
                    <img src="/assets/userback2.svg" alt='' style={{ backgroundSize:'cover',width: "100%", backgroundRepeat:'no-repeat'}} />
                </div>
                {hosInfos.length > 3 ? <GroupedSearch items = {{hosInfos}} /> : <Spinner />}
                <div className={styles.moh_user_container}>
                    <CardsMOHUser />
                    <ChartMOHUser/>
                    <CardsTotal data={dataTotal}/>
                    <ChartTotal data={dataTotal} /> 
                </div>
                <br/><br/><br/><br/><br/>
        </React.Fragment>
        );
    }
}

export default UserManagement;

