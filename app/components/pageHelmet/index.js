import React from 'react';
import { Helmet } from 'react-helmet';
import brand from '~/utilities/brand';

const PageHelmet = (props) => {
  const { title } = props;
  const description = brand.description;
  let pageTitle = brand.name;

  if (title) {
    pageTitle += ` - ${title}`;
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
}

export default PageHelmet;