import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { FEED_PAGE } from "../Routes";
function NotFoundPage() {
  return (
    <Layout title="Page Not Found" marginTop={120}>
      <Typography variant="h5" align="center" paragraph>
        Sorry, this page isn't available.
      </Typography>
      <Typography align="center">
        The link you followed may be broken, or the page may have been removed.<Link to={FEED_PAGE} style={{ color: "rgb(0,64,126)" }}> Go back to Instagram.</Link>
      </Typography>
    </Layout>
  );
}

export default NotFoundPage;
