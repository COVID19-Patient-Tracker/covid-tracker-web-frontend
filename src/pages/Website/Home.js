import React from 'react';

import background from '../../components/img/background.svg';

import {Cards, Chart,ChartTotal,CardsTotal} from '../../components';
import styles from '../../App.module.css';
import {fetchData,fetchTotalData} from '../../api/index.js';
import styled from 'styled-components';

import {HeaderContent} from '../../components/HeaderContent'; 
 
// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundImage: 'url(/assets/background.svg)',
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPositionY:'100%',
//         width: '100%',
//         height: '100vh'
//     },

//     container: {
//         paddingTop: theme.spacing(4),
//         paddingBottom: theme.spacing(4),
//     },
//     paper: {
//         padding: theme.spacing(2),
//         display: 'flex',
//         overflow: 'auto',
//         flexDirection: 'column',
//         backgroundColor: "#7c5265",
//     },
//     fixedHeight: {
//         height: 340,
//     },

// }));

class WebHome extends React.Component {

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
                <HeaderContent/>
                <div>
                    <img src={background} alt='' style={{backgroundPositionY:"100%", backgroundSize:'cover',width: "100%", backgroundRepeat:'no-repeat'}} />
                </div>
                <div className={styles.container}>
                    <Cards data={data}/>
                    <Chart data={data}/>
                    <CardsTotal data={dataTotal}/>
                    <ChartTotal data={dataTotal} /> 
                </div>
                <br/><br/><br/><br/><br/>
        </React.Fragment>
        );
    }
}

export default WebHome;

