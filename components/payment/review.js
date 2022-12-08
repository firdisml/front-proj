import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },


];


const payments = [
  // { name: 'Card type', detail: 'cardName' },
  { name: 'Card holder', detail: 'cardName' },
  { name: 'Card number', detail: 'cardNum' },
  { name: 'Expiry date', detail: 'cardExp' },
];

export default function Review({ paymentInfo, paymentDetail ,totalPayment}) {
  console.log(totalPayment)
  return (


    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

        <ListItem key={paymentInfo.subject} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={paymentInfo.subject}
            secondary={`${paymentInfo.days} - ${paymentInfo.time}  ${paymentDetail['subscription'] ? `(${paymentDetail['subscription']})` : ""}`} />
          <Typography variant="body2">${totalPayment}</Typography>
        </ListItem>


        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPayment}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>

            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentDetail[payment.detail]}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}