import { Hidden, Typography } from "@material-ui/core";
import React from "react";
import { useExploreSuggestionsStyles } from "../../styles";
import FollowSuggestions from "../shared/FollowSuggestions"

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles();

  return <Hidden xsDown>
    <div className={classes.container}>
      <Typography className={classes.typography} component="h2" variant="subtitle2" color="textSecondary">
        Discover People
      </Typography>
      <FollowSuggestions hideHeader />
  </div>
  </Hidden>;
}

export default ExploreSuggestions;
