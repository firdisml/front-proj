import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';

const subscriptions= [
    { id: '1 month', title: '1 month' },
    { id: '2 months', title: '2 months' },
    { id: '3 months', title: '3 months' },
    { id: '6 months', title: '6 months' },
    { id: '1 year', title: '1 year' },
]


export default function SelectChildren({ childData ,child,onChange,subscription}) {
    
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Select children
            </Typography>
            <Grid container>
                <Grid item xs={12} md={12}>
                <Form >
                    <Controls.Select
                        name="child"
                        label="Child"
                        value={child}
                        onChange={onChange}
                        options={childData}
                    />
                    </Form>
                    <Form >
                    <Controls.Select
                        name="subscription"
                        label="Subscriptions Plans"
                        value={subscription}
                        onChange={onChange}
                        options={subscriptions}
                    />
                    </Form>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}