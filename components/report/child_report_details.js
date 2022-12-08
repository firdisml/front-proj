import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Grid,
    Stack
} from '@mui/material'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Grid container spacing={3}>

                <Grid item xs>
                    <Typography variant="body2" color="text.secondary">{props.title || "others"}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <BorderLinearProgress variant="determinate" barColor="green"  {...props} />
                </Grid>
                <Grid item xs>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Grid>

            </Grid>

        </Box>
    );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme, barColor }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? barColor : '#barColor',
    },
}));


export const ChildReportDetails = (props) => {
    const { values,onClickDetail } = props


    const openDialog = (e) => {
        if (onClickDetail && typeof onClickDetail === "function") {
            onClickDetail(e);
        }
    }

    return (

        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={values.image}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {values.studentName}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {values.address}
                    </Typography>
                    {/* <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.timezone}
                </Typography> */}
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        alignItems: 'center',
                        // display: 'flex',
                        // flexDirection: 'column'
                    }}
                >
                    <LinearProgressWithLabel value={parseInt(values.mark)} title={values.subject} />
                    {/* <LinearProgressWithLabel value={50} title='Math' />
            <LinearProgressWithLabel value={50} title='Math' /> */}
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                  onClick={() => { openDialog('') }}
                    color="primary"
                    fullWidth
                    variant="text"
                >
                    Check Details
                </Button>
            </CardActions>
        </Card>
    )
};
