import * as React from 'react';
import ProductCategories from '../components/homepage/modules/views/ProductCategories';
import ProductSmokingHero from '../components/homepage/modules/views/ProductSmokingHero';
import AppFooter from '../components/homepage/modules/views/AppFooter';
import ProductHero from '../components/homepage/modules/views/ProductHero';
import ProductValues from '../components/homepage/modules/views/ProductValues';
import ProductHowItWorks from '../components/homepage/modules/views/ProductHowItWorks';
import ProductCTA from '../components/homepage/modules/views/ProductCTA';
import AppAppBar from '../components/homepage/modules/views/AppAppBar';
import withRoot from '../components/homepage/modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
