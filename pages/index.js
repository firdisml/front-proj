import Head from 'next/head'
import Image from 'next/image'

import  Homepage from '../pages/homepage'
import  Login from '../pages/login'


const Home = () => (
  <>
      <div >
        <Head>
          <title>Next App</title>
        </Head>
      </div>
  </>
);

Home.getLayout = (page) => (
  <Homepage>
    {page}
  </Homepage>
);


export default Home;
