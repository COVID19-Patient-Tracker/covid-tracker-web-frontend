import {
    Box,
    Container,
    Typography
} from '@material-ui/core';



const Forbidden = () => (
    <>
        <Box
            mt={4}
            sx={{backgroundColor: 'background.default',display: 'flex',flexDirection: 'column',height: '100%',justifyContent: 'center'}}>
            <Container maxWidth="md">
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h4"
                >
                    403: ACCESS DENIED
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="subtitle2"
                >
                    You either tried some shady route or you came here by mistake.
                    Whichever it is, try using the navigation
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        alt="Under development"
                        src="/assets/forbidden.jpg" // TODO :  add a appropriate access denied picture
                        style={{
                            marginTop: 50,
                            display: 'inline-block',
                            maxWidth: '100%',
                            width: 560
                        }}
                    />
                </Box>
            </Container>
        </Box>
    </>
);

export default Forbidden;