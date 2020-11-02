import { Person } from "@material-ui/icons";
import React from "react";
import { useProfilePictureStyles } from "../../styles";

function ProfilePicture({
  size,
  image = "https://i.imgur.com/OH2Yu1y.jpg",
  isOwner
}) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return <section className={classes.section}>
    {
      image ?
        (
          <div className={classes.wrapper}>
            <img src={image} alt="profile-pic" className={classes.image} />
          </div>
        ) :
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>

    }
  </section>;
}

export default ProfilePicture;
