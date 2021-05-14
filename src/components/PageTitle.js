import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PropTypes } from "prop-types"

const PageTitle = ({ title }) => {
  return (<Helmet>
    <title>
      {title} | Instaclone
    </title>
  </Helmet>);
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageTitle;