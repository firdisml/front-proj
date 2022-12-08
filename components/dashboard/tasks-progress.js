import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined'

export const TasksProgress = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Highest Earning Event
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
             ${props.value||0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
      <Typography
            // color="textPrimary"
            gutterBottom
            variant="overline"
          >
           Event: {props.title}
          </Typography>
      </Box>
    </CardContent>
  </Card>
);
