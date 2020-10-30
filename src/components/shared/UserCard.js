import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { PROFILE_PAGE } from "../../Routes";
import { useUserCardStyles } from "../../styles";
import { defaultUser } from "../../data";


function UserCard({ user = defaultUser,avatarSize=44 }) {
  const classes = useUserCardStyles({avatarSize});
  const { username, name, profile_image } = user
  return <div className={classes.wrapper}>
    <Link to={PROFILE_PAGE(username)}>
      <Avatar src={profile_image} alt="profile pic" className={classes.avatar} />
    </Link>
    <div className={classes.nameWrapper}>
      <Link to={PROFILE_PAGE(username)}>
        <Typography
          variant="subtitle2"
          className={classes.typography}
        >
          {username}
        </Typography>
      </Link>
      <Typography
        color="textSecondary"
        variant="body2"
        className={classes.typography}
      >
        {name}
      </Typography>

    </div>
  </div>
}

export default UserCard;
