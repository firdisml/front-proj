import { useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography,
    Stack
} from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';

const data = [
    { title: 'Performance', value: 'performance' },
    { title: 'Progress', value: 'progress' },
    { title: 'Status', value: 'status' },
    { title: 'Learning Speed', value: 'learningSpeed' },
    { title: 'Total Marks', value: 'mark' },
    { title: 'Remark', value: 'remark' },

]


export const ChildReport = (props) => {
    const { done, values } = props


    const submit = () => {
        if (done && typeof done === "function") {
            done()
        }
    }

    return (
        <form
            autoComplete="off"
            noValidate

        >


            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={2}
                    xs={2}
                >

                    <img
                        style={{
                            borderRadius: 4,
                        }}
                        src={values.image || "/static/images/avatars/default_profile.png"}
                        width={120}
                        height={120}
                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        // alt={item.title}
                        loading="lazy"
                    />
                </Grid>

                <Grid item xs={10}>
                    <Typography variant="h6" gutterBottom>
                        {values.studentName}
                    </Typography>
                    {/* <Rating name="read-only" value={values.rating || 0} readOnly /> */}
                    <Stack direction="row" alignItems="center" gap={1}>
                        <PhoneIcon />
                        <Typography variant="body1" gutterBottom>
                            {values.studentPhone}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <PlaceIcon />
                        <Typography variant="body1" gutterBottom>
                            {values.studentAddress}
                        </Typography>
                    </Stack>
                </Grid>

                {data.map((a1) =>
                    <>
                        <Grid
                            item
                            md={5}
                            xs={5}
                        >
                            <Typography variant="body1" gutterBottom>
                                {a1.title}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={1}
                            xs={1}
                        >
                            <Typography variant="body1" gutterBottom>
                                :
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={6}
                        >
                            <Typography variant="body1" gutterBottom>
                            {values[a1.value]}
                            </Typography>
                        </Grid>
                    </>
                )}
            </Grid>

            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    onClick={submit}
                    color="primary"
                    variant="contained"
                >
                    Done
                </Button>
            </Box>

        </form>
    );
};
