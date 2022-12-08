import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import MoneyIcon from '@mui/icons-material/Money'

export const Budget = (props) => (
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
            WEEKLY PROFIT
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
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
       {props.arrow==='up'? <ArrowUpwardIcon color="success" />:<ArrowDownwardIcon color="error" /> }
        <Typography
          color={props.arrow==='up'?"":'error'}
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          {props.percentage||0}%
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
