import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Button } from '@mui/material'
import { Budget } from '../components/dashboard/budget'
import { LatestOrders } from '../components/dashboard/latest-orders'
import { LatestProducts } from '../components/dashboard/latest-products'
// import { Sales } from '../components/dashboard/sales'
import { TasksProgress } from '../components/dashboard/tasks-progress'
import { TotalCustomers } from '../components/dashboard/total-customers'
import { TotalProfit } from '../components/dashboard/total-profit'
import { TrafficByDevice } from '../components/dashboard/traffic-by-device'
import { DashboardLayout } from '../components/dashboard-layout'
import MemoTable from '../components/basicTable'
import { LineCharts } from '../components/chart/LineCharts'
import { BarChart } from '../components/chart/BarCharts'
import { useSelector, useDispatch } from 'react-redux';
// import ResponsiveCharts from '../components/dynamicChart'
import { addReport, getReport } from '../actions/reportActions'
const Dashboard = () => {
  const dispatch = useDispatch();
  const report = useSelector(state => state.report);
  const { data } = report
  console.log(data)


  const onClickGenerate = () => {
    dispatch(addReport())
  }

  function getArrow(item) {
    if (item) {
      return item.type === 1 ? 'up' : 'down'
    }

    return 'up'

  }

  function getObjectValue(item) {
    if (item) {
      return item.value ? item.value : 0
    }
    return 0
  }

  function formDataset(items) {
    if (items && items.length > 0) {
      let obj = {
        first: [],
        second: [],
        label: []
      }
      items.forEach(a1 => {
        obj.first.push(a1.total_earning)
        obj.second.push(a1.booking_num)
        obj.label.push(a1.even_title||`week ${a1.week}`)
      })

      return obj

    }
    return { first: [], second: [], label: [] }
  }



  useEffect(() => {
    dispatch(getReport())
    return () => {
      //
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth={false}>
          <Button
            color="primary"
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => { onClickGenerate() }}
          // onClick={() => { setOpenPopup(true); setRecordForAdd(null); }}
          >
            Generate Weekly Report
          </Button>
          <Grid
            rowSpacing={1}
            container
            spacing={1}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Budget sx={{ height: '90%' }}
                arrow={getArrow(data.profit_com)}
                percentage={getObjectValue(data.profit_com)}
                value={data.weekly_profit}
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers sx={{ height: '90%' }}
                arrow={getArrow(data.book_comp)}
                percentage={getObjectValue(data.book_comp)}
                value={data.weekly_booking} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >

              <TasksProgress sx={{ height: '90%' }}
                title={data.highest_earning_event_name}
                value={data.highest_earning_event} />
            </Grid>
            <Grid

              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalProfit sx={{ height: '90%' }}
                value={data.total_earning} />
            </Grid>



            <Grid
              item
              lg={6}
              sm={6}
              xl={3}
              xs={12}
            >
              <BarChart
                datasets={formDataset(data.latest_week_record)}
                title={'Latest Events'} />
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={3}
              xs={12}
            >
              <LineCharts
                datasets={formDataset(data.data)} />
            </Grid>

            <Grid
              sx={{
                mt: 2
              }}
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <MemoTable
                data={data.data}
                column={['week', 'latest_updated_date', 'booking_num', 'total_earning']}
                title={'Events'}
                // search={search}
                action={false}
              />
            </Grid>
          </Grid>

        </Container>
      </Box>
    </>
  );

}

Dashboard.getLayout = (page) => (
<DashboardLayout type={typeof window !== "undefined"?JSON.parse(localStorage.getItem('type')):''}>
    {page}
  </DashboardLayout>
);

export default Dashboard;
