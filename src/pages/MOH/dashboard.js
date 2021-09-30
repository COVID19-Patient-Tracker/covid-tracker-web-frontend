import React from 'react';

import {CardsMOHUser, ChartMOHUser,ChartTotal,CardsTotal} from '../../components';
import styles from '../../App.module.css';
import {fetchData,fetchTotalData} from '../../api/index.js';
import {HeaderContentMOH} from '../../components/HeaderContent'; 
import GroupedSearch from '../../components/MOH/dashboard/ws';
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
        const {dataTotal} = this.state;
        const items = [
            { title: 'Hospital A' },
            { title: 'Hospital B' },
            { title: 'Hospital C' },
            { title: 'Hospital D' },
            { title: 'Hospital E' },
            { title: "Hospital F" },
        ];
        
        return ( 
            <React.Fragment>
                <HeaderContentMOH/>
                <div>
                    <img src="/assets/userback2.svg" alt='' style={{ backgroundSize:'cover',width: "100%", backgroundRepeat:'no-repeat'}} />
                </div>
                <GroupedSearch items = {items} />
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

