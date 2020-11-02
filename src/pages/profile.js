import React, { useState } from "react";
import { useProfilePageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import { defaultCurrentUser } from "../data";
import { Avatar, Button, Card, CardContent, Dialog, DialogTitle, Divider, Hidden, Typography, Zoom } from "@material-ui/core";
import ProfilePicture from "../components/shared/ProfilePicture";
import { Link } from "react-router-dom";
import { GearIcon } from "../icons";
import ProfileTabs from "../components/profile/ProfileTabs";

function ProfilePage() {
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const isOwner = true;

  function handleOptionsMenuClick() {
    setShowOptionsMenu(true)
  }
  function handleCloseMenu() {
    setShowOptionsMenu(false)
  }

  return <Layout title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}>
    <div className={classes.container}>
      <Hidden xsDown>
        <Card className={classes.cardLarge}>
          <ProfilePicture isOwner={isOwner} />
          <CardContent className={classes.cardContentLarge}>
            <ProfileNameSection
              user={defaultCurrentUser}
              isOwner={isOwner}
              handleOptionsMenuClick={handleOptionsMenuClick}
            />
            <PostCountSection user={defaultCurrentUser} />
            <NameBioSection user={defaultCurrentUser} />
          </CardContent>
        </Card>
      </Hidden>
      <Hidden smUp>
        <Card className={classes.cardSmall}>
          <CardContent>
            <section className={classes.sectionSmall}>
              <ProfilePicture size={77} isOwner={isOwner} />
              <ProfileNameSection
                user={defaultCurrentUser}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
            </section>
            <NameBioSection user={defaultCurrentUser} />
          </CardContent>
          <PostCountSection user={defaultCurrentUser} />
        </Card>
      </Hidden>
      {
        showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />
      }
    </div>
    <ProfileTabs user={defaultCurrentUser} isOwner={isOwner} />
  </Layout>;
}

function ProfileNameSection({ handleOptionsMenuClick, user, isOwner }) {

  const classes = useProfilePageStyles();
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);

  let followButton, isFollowing = true, isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button className={classes.button} variant="outlined" onClick={() => setShowUnfollowDialog(true)}>
        Following
      </Button>
    )
  } else if (isFollower) {
    followButton = (
      <Button className={classes.button} variant="contained" color="primary">
        Follow Back
      </Button>
    )
  } else {
    followButton = (
      <Button className={classes.button} variant="contained" color="primary">
        Follow
      </Button>
    )
  }

  return (<>
    <Hidden xsDown>
      <section className={classes.usernameSection}>
        <Typography className={classes.username}>{user.username}</Typography>
        {
          isOwner ? <>
            <Link to="/accounts/edit">
              <Button variant="outlined">Edit Profile</Button>
            </Link>
            <div className={classes.settingsWrapper} onClick={handleOptionsMenuClick}>
              <GearIcon className={classes.settings} />
            </div>
          </> :
            <>
              {followButton}
            </>
        }
      </section>
    </Hidden>
    <Hidden smUp>
      <section>
        <div className={classes.usernameDivSmall}>
          <Typography className={classes.username}>
            {user.username}
          </Typography>
          {
            isOwner && <div onClick={handleOptionsMenuClick} className={classes.settingsWrapper}>
              <GearIcon className={classes.settings} />
            </div>
          }
          <div>
            {
              isOwner ? <Link to="/accounts/edit">
                <Button variant="outlined" style={{ width: '100%' }}>Edit Profile</Button>
              </Link>
                :
                followButton
            }
          </div>
        </div>
      </section>
    </Hidden>
    {
      showUnfollowDialog && <UnFollowDialog user={user} onClose={() => setShowUnfollowDialog(false)} />
    }
  </>)
}

function UnFollowDialog(
  { onClose
    , user
  }
) {
  const classes = useProfilePageStyles()

  return <Dialog open classes={{
    scrollPaper: classes.unfollowDialogScrollPaper,
  }}
    onClose
    TransitionComponent={Zoom}
  >
    <div className={classes.wrapper}>
      <Avatar src={user.profile_image} alt="User's Avatar" className={classes.avatar} />
    </div>
    <Typography variant="body2" align="center" className={classes.unfollowDialogText}>
      Unfollow @{user.username}?
    </Typography>
    <Divider />
    <Button className={classes.unfollowButton}>
      UnFollow
    </Button>
    <Divider />
    <Button className={classes.cancelButton} onClick={onClose}>
      Cancel
    </Button>
  </Dialog>
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();

  const options = ["posts", "followers", "following"]

  console.log(user)

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        {options.map(option => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[option].length}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color="textSecondary">{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>)
}
function NameBioSection({ user }) {
  const classes = useProfilePageStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
}


function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [showLogOutMessage, setShowLogOutMessage] = useState(false)
  function handleLogOutClick() {
    setShowLogOutMessage(true)
  }
  return <Dialog
    open
    classes={{
      scrollPaper: classes.dialogScrollPaper,
      paper: classes.dialogScrollPaper
    }}
    TransitionComponent={Zoom}
  >
    {
      showLogOutMessage ? <DialogTitle className={classes.dialogTitle}>
        Logging Out
         <Typography color="textSecondary">
          You need to log back in to continue using Instagram
         </Typography>
      </DialogTitle>
        : <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="NameTag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Close" onClick={handleCloseMenu} />
        </>
    }
  </Dialog>

}
function OptionsItem({ text, onClick }) {
  return <>
    <Button style={{ padding: "12px 8px" }} onClick={onClick}>
      {text}
    </Button>
    <Divider />
  </>
}

export default ProfilePage;
