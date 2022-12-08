import Head from 'next/head'
import { Box, Container, Button, Stack } from '@mui/material'
import MemoTable from '../components/basicTable'
import TableToolbar from '../components/basicToolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import React, { useEffect, useState, useRef } from 'react'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import { useSelector, useDispatch } from 'react-redux';
import { getPayment, getPaymentById, updateBooking } from '../actions/paymentAction'
import Invoice from '../components/payment/invoice'
import Popup from '../components/Popup'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { setDayWithOptions } from 'date-fns/fp'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import PaidIcon from '@mui/icons-material/Paid';
const Payment = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const payments = useSelector(state => state.payments);
  const { data, loading } = payments

  // const bookingUpdate = useSelector(state => state.bookingUpdate);
  // const { loading } = payments


  const [openPopup, setOpenPopup] = useState(false);
  const [invoiceData, setInvoiceData] = useState(
    {
      id: "5df3180a09ea16dc4b95f910",
      invoice_no: "201906-28",
      // balance: "$2,283.74",
      fullname: "MANTRIX",
      email: "susanafuentes@mantrix.com",
      phone: "+1 (872) 588-3809",
      address: "922 Campus Road, Drytown, Wisconsin, 1986",
      trans_date: "26-11-2021",
      // due_date: "26-11-2021",
      companyID: "10001",
      companyName: "A+Class Home Tuition",
      items: [
        {
          sno: 1,
          desc: "FinePix Pro2 3D Camera",
          qty: 2,
          rate: 1600.00,
        },
      ]
    }
  );


  const type = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''
  const id = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('id')) : ''

  const onChangeSearch = (e) => {
    setSearch(e)
  };

  const onClickEvent = (e, type, row) => {
    let data = {
      companyID: "10001",
      companyName: "A+Class Home Tuition",
      items: []
    }
    let getOnly = new Date(row.date)
    let trans_date = getOnly.toLocaleDateString()
    data['id'] = row.invoiceId || ''
    data['invoice_no'] = row.invoiceId || ''
    data['fullname'] = row.clientName || ''
    data['email'] = row.email || ''
    data['phone'] = row.phone || ''
    data['address'] = row.address || ''
    data['trans_date'] = trans_date || ''
    data['items'].push(
      {
        sno: 1,
        desc: row.subject,
        qty: getMonth(row.subscription),
        rate: row.price,
      },
    )

    setInvoiceData(data)
    setOpenPopup(true)
  }

  function getMonth(sub) {
    try {
      switch (sub) {
        case '1 month':
          return 1
        // break
        case '2 months':
          return 2
        // break
        case '3 months':
          return 3
        // break
        case '6 months':
          return 6
        // break
        case '1 year':
          return 12
        // break
        default:
          return 1
      }
    } catch (e) {
      return 1
    }
  }





  useEffect(() => {
    if (type === 'Parent') {
      dispatch(getPaymentById(id))
    } else {
      dispatch(getPayment())
    }

    return () => {
      //
    };
  }, []);


  // function getSortData(items) {
  //   // console.log(items)
  //   let data2 = JSON.parse(JSON.stringify(items));

  //   const arr1 = data2.map(obj => {
  //   //   const myArray = obj.start_date.split("/");
  //   //   let day = parseInt(myArray[0]);
  //   //   let month = parseInt(myArray[1]);
  //   //   let year = parseInt(myArray[2]);
  //     let price = parseInt(obj.price) || 0;
  //     return { ...obj, price: price };
  //   });

  //   if (filter === 'None') {
  //     return data2
  //   }

  //   if (filter === 'Date') {
  //     const sortedAsc = arr1.sort(
  //       (objA, objB) => Number(objB.date) - Number(objA.date),
  //     );
  //     return sortedAsc
  //   }
  //   if (filter === 'DateAsc') {
  //     const sortedAsc = arr1.sort(
  //       (objA, objB) => Number(objA.date) - Number(objB.date),
  //     );
  //     return sortedAsc
  //   }

  //   if (filter === 'PriceAsc') {
  //     const sortedAsc = arr1.sort(
  //       (objA, objB) => objA.price - objB.price,
  //     );
  //     return sortedAsc
  //   }

  //   if (filter === 'Price') {
  //     const sortedAsc = arr1.sort(
  //       (objA, objB) => objB.price - objA.price,
  //     );
  //     return sortedAsc
  //   }

  // }

  return (<>
    <Head>
      <title>
        Payments
      </title>
    </Head>

    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>

        <TableToolbar
          icon={<PaidIcon fontSize="large" />}
          title={'Payment'}
          onChangeSearch={onChangeSearch}
        />

        <Popup title="Invoice"
          maxWidth='md'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <PDFViewer width={800} height={500} showToolbar={false}>
            <Invoice invoicedata={invoiceData} />
          </PDFViewer>

        </Popup>


        <Box sx={{ mt: 3 }}>

          <MemoTable
            data={data}
            column={['date', 'client', 'tutor', 'subject', 'price']}
            title={'Payment'}
            search={search}
            // showDelete={true}
            // showApprove={true}
            action={true}
            onChange={onClickEvent}
            // showApprove={true}
            showPDF={true}
          />
        </Box>
      </Container>
    </Box>
  </>
  )
};

Payment.getLayout = (page) => (
  <DashboardLayout type={typeof window !== "undefined" ? JSON.parse(localStorage.getItem('type')) : ''}>
    {page}
  </DashboardLayout>
);


export default Payment;
