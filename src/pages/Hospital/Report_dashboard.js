import React from 'react'
import {Card, Content, Icon, PlanTitle} from './patientcard.Css.js'
import "../../components/icofont.min.css"
import "../../components/css/forms.css"

import './history';

import { useHistory } from 'react-router-dom';

import '../../components/css/search.css';

function App(){
  	return (
		<section >
    		<h1 className="h2text">Reports</h1>
			<div className = 'cards'>
				<PatientCard/>
				<PatientCard1/>
				<PatientCard2/>
				<PatientCard3/>
				<PatientCard4/>
			</div>
  		</section>
		
		
	);
}

// const Search = () => {
    

// 	const [myOptions] = useState([])
// 	return (
// 		<div className = 'search' >
// 			<Autocomplete style={{marginTop:"15%"}}
// 				freeSolo
// 				autoComplete
// 				autoHighlight
// 				options={myOptions}
// 				renderInput={(params) => (
// 				<TextField {...params}
// 					variant="outlined"
// 					label="Patient's NIC"
// 				/>
// 				)}
// 			/>
// 		</div>
// 	);
// }

const PatientCard = () => { 
    const history = useHistory();
    const handleClick = () => history.push('/hospital/user/checkReport');
    return (
        <div style={{marginTop:"5%", marginLeft:"5%"}}>
            <Card onClick={handleClick}>
                <Content>
                    <Icon className="icofont-paper"/>
                        <PlanTitle>Update admitted patient record</PlanTitle>
                </Content>
            </Card>
        </div>
    ) 
}

const PatientCard1 = () => {
    const history = useHistory();
    const handleClick = () => history.push('/hospital/user/checkResult');
    return (
        <div style={{marginTop:"5%", marginLeft:"5%"}}>
            <Card onClick={handleClick}>
                <Content>
                    <Icon className="icofont-injection-syringe"/>
                        <PlanTitle>Record PCR antigen test results</PlanTitle>
                </Content>
            </Card>
        </div>
    )
}

const PatientCard2 = () => {
    const history = useHistory();
    const handleClick = () => history.push('/hospital/user/checkStatus');
    return (
        <div style={{marginTop:"5%", marginLeft:"5%"}}>
            <Card onClick={handleClick}>
                <Content>
                    <Icon className="icofont-icu"/>
                        <PlanTitle>Record patient’s current status</PlanTitle>
                </Content>
            </Card>
        </div>
    )
}

const PatientCard3 = () => {
    const history = useHistory();
    const handleClick = () => history.push('/hospital/user/checkWard');
    return (
        <div style={{marginTop:"5%", marginLeft:"5%"}}>
            <Card onClick={handleClick}>
                <Content>
                    <Icon className="icofont-patient-bed"/>
                        <PlanTitle>Update patient ward transfer</PlanTitle>
                </Content>
            </Card>
        </div>
    )
}

const PatientCard4 = () => {
    const history = useHistory();
    const handleClick = () => history.push('/hospital/user/checkHospital');
    return (
        <div style={{marginTop:"5%", marginLeft:"5%"}}>
            <Card onClick={handleClick}>
                <Content>
                    <Icon className="icofont-hospital"/>
                        <PlanTitle>Update patient hospital transfer</PlanTitle>
                </Content>
            </Card>
        </div>
    )
}



export default App