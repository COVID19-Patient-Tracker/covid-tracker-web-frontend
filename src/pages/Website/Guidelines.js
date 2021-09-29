import React from 'react';

import { makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@material-ui/core";
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import background from '../../components/img/background.svg';

import '../../components/css/guideline.css';
import styled from 'styled-components';

import {HeaderContentGuideline} from '../../components/HeaderContent'; 
 

class Guidelines extends React.Component {

    render() {
        return ( 
            <React.Fragment>
                <HeaderContentGuideline/>
                <div>
                    <img src={background} alt='' style={{backgroundPositionY:"100%", backgroundSize:'cover',width: "100%", backgroundRepeat:'no-repeat'}} />
                </div>
                <Box m={5} p={3} bgcolor="#7dd4c6">
                <Typography variant="h4" gutterBottom align="center">FAQs about COVID</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className='heading'>What is a coronavirus? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Coronaviruses are a large family of viruses which may cause illness in animals or humans. In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className='heading'>How does COVID-19 spread?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            People can catch COVID-19 from others who have the virus. The disease can spread from person to person
                            through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or
                            exhales. These droplets land on objects and surfaces around the person. Other people then catch
                            COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick. WHO is assessing ongoing research on the ways COVID-19 is spread and will continue to share updated findings.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className='heading'>What are symptoms of COVID-19 ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            People can catch COVID-19 from others who have the virus. The disease can spread from person to person
                            through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or
                            exhales. These droplets land on objects and surfaces around the person. Other people then catch
                            COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick. WHO is assessing ongoing research on the ways COVID-19 is spread and will continue to share updated findings.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className='heading'>How to protect myself and prevent the spread of disease? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Protection measures for everyone Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Many countries around the world have seen cases of COVID-19 and several have seen outbreaks. Authorities in China and some other countries have succeeded in slowing or stopping their outbreaks. However, the situation is unpredictable so check regularly for the latest news.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box p={3} m={2} textAlign="-webkit-center" >
                <Typography variant="h4" align="center" gutterBottom>Symptoms</Typography>
                <Typography variant="body2" align="center" gutterBottom>You can minimize your chance of being infected by taking simple precautions.</Typography>
                <Box>
                    <img src="/assets/symptoms.png" alt="jhjhj" className="symptoms"/>
                </Box>
            </Box>

            <Box p={3} m={2} textAlign="-webkit-center" >
                <Typography variant="h4" align="center" gutterBottom>Prevention</Typography>
                <Typography variant="body2" align="center" gutterBottom>You can minimize your chance of being infected by taking simple precautions.</Typography>
                <List className='listStyle'>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/assets/image.png" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Maintain Distance"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className='inline'
                                        color="textPrimary"
                                    >
                                        Maintain a safe distance from others, even if they don’t appear to be sick.
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/assets/dash-cover.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Wear a mask"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className='inline'
                                        color="textPrimary"
                                    >
                                        Wear a mask in public, especially indoors or when physical distancing is not possible.
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/assets/vaccine.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Wash Hand"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className='inline'
                                        color="textPrimary"
                                    >
                                        Clean your hands often. Use soap and water, or an alcohol-based hand rub.
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/assets/home-back.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Get Vaccination"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className='inline'
                                        color="textPrimary"
                                    >
                                        Get vaccinated when it’s your turn. Follow local guidance about vaccination.
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
                <br/><br/><br/><br/><br/>
        </React.Fragment>
        );
    }
}

export default Guidelines;


// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundImage: 'url(/assets/guideline.webp)',
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         width: '100vw',
//         height: '60vh'
//     },
//     container: {
//         paddingTop: theme.spacing(3),
//         paddingBottom: theme.spacing(3),
//     },
//     heading: {
//         fontSize: theme.typography.pxToRem(15),
//         fontWeight: theme.typography.fontWeightRegular,
//     },
//     listStyle: {
//         width: '100%',
//         maxWidth: '86ch',
//         backgroundColor: "#c3e3bf",
//         alignItems: "center",
//     },
//     inline: {
//         display: 'inline',
//     },

// }));



// export default function Guidelines() {

//     const classes = useStyles();

//     return (
//         <React.Fragment>
//             <div className={classes.root}></div>
//             <Box m={5} p={3} bgcolor="#E0C2FF">
//                 <Typography variant="h4" gutterBottom align="center">FAQs about COVID</Typography>
//                 <Accordion expanded>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                     >
//                         <Typography className={classes.heading}>What is a coronavirus? </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography>
//                             Coronaviruses are a large family of viruses which may cause illness in animals or humans. In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19.
//                         </Typography>
//                     </AccordionDetails>
//                 </Accordion>
//                 <Accordion>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel2a-content"
//                         id="panel2a-header"
//                     >
//                         <Typography className={classes.heading}>How does COVID-19 spread?</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography>
//                             People can catch COVID-19 from others who have the virus. The disease can spread from person to person
//                             through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or
//                             exhales. These droplets land on objects and surfaces around the person. Other people then catch
//                             COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick. WHO is assessing ongoing research on the ways COVID-19 is spread and will continue to share updated findings.
//                         </Typography>
//                     </AccordionDetails>
//                 </Accordion>
//                 <Accordion>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel3a-content"
//                         id="panel3a-header"
//                     >
//                         <Typography className={classes.heading}>What are symptoms of COVID-19 ?</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography>
//                             People can catch COVID-19 from others who have the virus. The disease can spread from person to person
//                             through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or
//                             exhales. These droplets land on objects and surfaces around the person. Other people then catch
//                             COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick. WHO is assessing ongoing research on the ways COVID-19 is spread and will continue to share updated findings.
//                         </Typography>
//                     </AccordionDetails>
//                 </Accordion>
//                 <Accordion>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel3a-content"
//                         id="panel3a-header"
//                     >
//                         <Typography className={classes.heading}>How to protect myself and prevent the spread of disease? </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography>
//                             Protection measures for everyone Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Many countries around the world have seen cases of COVID-19 and several have seen outbreaks. Authorities in China and some other countries have succeeded in slowing or stopping their outbreaks. However, the situation is unpredictable so check regularly for the latest news.
//                         </Typography>
//                     </AccordionDetails>
//                 </Accordion>
//             </Box>

//             <Box p={3} m={2} textAlign="-webkit-center" >
//                 <Typography variant="h4" align="center" gutterBottom>Symptoms</Typography>
//                 <Typography variant="body2" align="center" gutterBottom>You can minimize your chance of being infected by taking simple precautions.</Typography>
//                 <Box>
//                     <img src="/assets/symptoms.png" alt="jhjhj"
//                         style={{
//                             size: "600px",
//                             height: "400px",
//                             width: "900px",
//                             left: "88px",
//                         }} />
//                 </Box>
//             </Box>

//             <Box p={3} m={2} textAlign="-webkit-center" >
//                 <Typography variant="h4" align="center" gutterBottom>Prevention</Typography>
//                 <Typography variant="body2" align="center" gutterBottom>You can minimize your chance of being infected by taking simple precautions.</Typography>
//                 <List className={classes.listStyle}>
//                     <ListItem alignItems="flex-start">
//                         <ListItemAvatar>
//                             <Avatar alt="Remy Sharp" src="/assets/image.png" />
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary="Maintain Distance"
//                             secondary={
//                                 <React.Fragment>
//                                     <Typography
//                                         component="span"
//                                         variant="body2"
//                                         className={classes.inline}
//                                         color="textPrimary"
//                                     >
//                                         Maintain a safe distance from others, even if they don’t appear to be sick.
//                                     </Typography>
//                                 </React.Fragment>
//                             }
//                         />
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                     <ListItem alignItems="flex-start">
//                         <ListItemAvatar>
//                             <Avatar alt="Travis Howard" src="/assets/dash-cover.jpg" />
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary="Wear a mask"
//                             secondary={
//                                 <React.Fragment>
//                                     <Typography
//                                         component="span"
//                                         variant="body2"
//                                         className={classes.inline}
//                                         color="textPrimary"
//                                     >
//                                         Wear a mask in public, especially indoors or when physical distancing is not possible.
//                                     </Typography>
//                                 </React.Fragment>
//                             }
//                         />
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                     <ListItem alignItems="flex-start">
//                         <ListItemAvatar>
//                             <Avatar alt="Cindy Baker" src="/assets/vaccine.jpg" />
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary="Wash Hand"
//                             secondary={
//                                 <React.Fragment>
//                                     <Typography
//                                         component="span"
//                                         variant="body2"
//                                         className={classes.inline}
//                                         color="textPrimary"
//                                     >
//                                         Clean your hands often. Use soap and water, or an alcohol-based hand rub.
//                                     </Typography>
//                                 </React.Fragment>
//                             }
//                         />
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                     <ListItem alignItems="flex-start">
//                         <ListItemAvatar>
//                             <Avatar alt="Cindy Baker" src="/assets/home-back.jpg" />
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary="Get Vaccination"
//                             secondary={
//                                 <React.Fragment>
//                                     <Typography
//                                         component="span"
//                                         variant="body2"
//                                         className={classes.inline}
//                                         color="textPrimary"
//                                     >
//                                         Get vaccinated when it’s your turn. Follow local guidance about vaccination.
//                                     </Typography>
//                                 </React.Fragment>
//                             }
//                         />
//                     </ListItem>
//                 </List>
//             </Box>
//         </React.Fragment>

//     )
// }

