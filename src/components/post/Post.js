/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFeedPostStyles, usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { CommentIcon, LikeIcon, MoreIcon, RemoveIcon, SaveIcon, ShareIcon, UnlikeIcon } from "../../icons"
import { Link } from "react-router-dom";
import { POST_PAGE, PROFILE_PAGE } from "../../Routes";
import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import OptionsDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";
import PostSkeleton from "./PostSkeleton";



function Post({ post, index }) {
  const classes = usePostStyles();
  const [loading, setLoading] = useState(true)
  const { media, likes, comments, created_at, user, id, caption } = defaultPost;
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);


  setTimeout(() => {
    setLoading(false);
  }, 3000);

  if(loading) return <PostSkeleton/>


  return <div className={classes.postContainer}>
    <article className={classes.article} >
      {/* PostHeader */}
      <div className={classes.postHeader}>
        <UserCard user={user} avatarSize={32} />
        <MoreIcon className={classes.moreIcon} onClick={() => setShowOptionsDialog(true)} />
      </div>
      {/* Post Image */}
      <div className={classes.postImage}>
        <img src={media} alt="user-media" className={classes.image} />
      </div>
      {/* Post Buttons */}
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
        <div className={classes.postCaptionContainer}>
          <Typography className={classes.postCaption} variant="body2" component="span"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
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
        </div>
        <Typography color="textSecondary" className={classes.datePosted}>
          3 DAYS AGO
        </Typography>
        <Hidden xsDown>
          <div className={classes.comment}>
            <Divider />
            <Comment />
          </div>
        </Hidden>
      </div>
    </article>
    {showOptionsDialog && <OptionsDialog onClose={() => setShowOptionsDialog(false)} />}
  </div>
}


// Functions -----------------------------------



function LikeButton() {
  const classes = usePostStyles();
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
  const classes = usePostStyles();
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
  const classes = usePostStyles();
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
export default Post;
