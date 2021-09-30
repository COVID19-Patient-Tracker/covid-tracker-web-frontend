import React from 'react';

import {CardsHospitalUser, ChartHospitalUser,ChartTotal,CardsTotal} from '../../components';
import styles from '../../App.module.css';
import {fetchData,fetchTotalData} from '../../api/index.js';
import {HeaderContentHospitalUser} from '../../components/HeaderContent'; 

class UserManagement extends React.Component {

    state = {
        data: {},
        dataTotal:{}
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        const fetchedTotalData = await fetchTotalData();

        this.setState({data:fetchedData, dataTotal:fetchedTotalData})
    }
    render() {
        const {data} = this.state;
        const {dataTotal} = this.state;
        
        return ( 
            <React.Fragment>
                <HeaderContentHospitalUser/>
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

