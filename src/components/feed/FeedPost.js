/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { CommentIcon, LikeIcon, MoreIcon, RemoveIcon, SaveIcon, ShareIcon, UnlikeIcon } from "../../icons"
import { Link } from "react-router-dom";
import { POST_PAGE, PROFILE_PAGE } from "../../Routes";
import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import FollowSuggestions from "../shared/FollowSuggestions";
import OptionsDialog from "../shared/OptionsDialog"



function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const { media, likes, comments, created_at, user, id, caption } = post;
  const [showCaption, setShowCaption] = useState(false)
  const showFollowSuggestions = index === 1;
  const [showOptionsDialog, setShowOptionsDialog] = useState(false)

  return <>
    <article className={classes.article} style={{ marginBotto: showFollowSuggestions && 30 }}>
      {/* <FeedPostHeader */}
      <div className={classes.postHeader}>
        <UserCard user={user} />
        <MoreIcon className={classes.moreIcon} onClick={() => setShowOptionsDialog(true)} />
      </div>
      {/* Feed Post Image */}
      <div>
        <img src={media} alt="user-media" className={classes.image} />
      </div>
      {/* Feed Post Buttons */}
      <div className={classes.postButtonsWrapper}>
        <div className={classes.postButtons}>
          <LikeButton />
          <Link to={POST_PAGE(id)}>
            <CommentIcon />
          </Link>
          <ShareIcon />
          <SaveButton />
        </div>
        <Typography className={classes.likes} variant="subtitle2">
          <span>{likes === 1 ? "1 Like" : `${likes} Likes`}</span>
        </Typography>
        <div className={showCaption ? classes.expanded : classes.collapsed}>
          <Link to={PROFILE_PAGE(user.username)}>
            <Typography className={classes.username} variant="subtitle2" component="span">
              {user.username}
            </Typography>
          </Link>
          {showCaption ? (
            <Typography variant="body2" component="span"
              dangerouslySetInnerHTML={{ __html: caption }}
            />
          ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis
                  unsafeHTML={caption}
                  className={classes.caption}
                  maxLine="0"
                  ellipsis="..."
                  basedOn="letters"
                />
                <Button className={classes.moreButton}
                  onClick={() => setShowCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
        </div>
        <Link to={POST_PAGE(id)}>
          <Typography
            className={classes.commentsLink}
            variant="body2"
            component="div"

          >
            View all {comments.length} comments
          </Typography>
        </Link>
        {comments.map(comment => (
          <div key={comment.id}>
            <Link to={PROFILE_PAGE(comments.user.username)}>
              <Typography className={classes.commentUsername}
                variant="subtitle2"
                component="span"
              >
                {comment.user.username}
              </Typography>{" "}
              <Typography
                variant="body2"
                component="span"
              >
                {comment.content}
              </Typography>
            </Link>
          </div>
        ))}
        <Typography color="textSecondary" className={classes.datePosted}>
          3 DAYS AGO
        </Typography>
      </div>
      <Hidden xsDown>
        <Divider />
        <Comment />
      </Hidden>
    </article>
    {
      showFollowSuggestions && <FollowSuggestions />
    }
    {showOptionsDialog && <OptionsDialog onClose={() => setShowOptionsDialog(false)} />}
  </>;
}


// Functions -----------------------------------



function LikeButton() {
  const classes = useFeedPostStyles();
  const [liked, setLiked] = useState(false)

  const Icon = liked ? UnlikeIcon : LikeIcon

  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike

  function handleUnlike() {
    console.log("Unliked")
    setLiked(false)
  }

  function handleLike() {
    console.log("liked")
    setLiked(true)
  }

  return <Icon style={{ cursor: "pointer" }} className={className} onClick={onClick} />
}
function SaveButton() {
  const classes = useFeedPostStyles();
  const [saved, setSaved] = useState(false)

  const Icon = saved ? RemoveIcon : SaveIcon

  const onClick = saved ? handleRemove : handleSave

  function handleRemove() {
    console.log("removed")
    setSaved(false)
  }

  function handleSave() {
    console.log("saved")
    setSaved(true)
  }

  return <Icon style={{ cursor: "pointer" }} className={classes.saveIcon} onClick={onClick} />
}
function Comment() {
  const classes = useFeedPostStyles();
  const [content, setContent] = useState("")

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={({ target }) => setContent(target.value)}
        InputProps={
          {
            classes: {
              root: classes.root,
              underline: classes.underline
            }
          }
        }
        className={classes.textField}
      >
      </TextField>
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >Post</Button>

    </div>
  )
}
export default FeedPost;
