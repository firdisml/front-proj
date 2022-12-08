import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import PeopleIcon from '@mui/icons-material/PeopleOutlined'

export const TotalCustomers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: 'space-between', mt: 0 }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            WEEKLY CUSTOMERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.value || 0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 1
        }}
      >
        {props.arrow === 'up' ? <ArrowUpwardIcon color="success" /> : <ArrowDownwardIcon color="error" />}
        <Typography
          color={props.arrow === 'up' ? "" : 'error'}
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          {props.percentage || 0}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last week
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
