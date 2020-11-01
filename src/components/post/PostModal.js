import React from "react";
import { usePostModalStyles } from "../../styles";
import Modal from "react-modal";
import { useHistory, useParams } from "react-router-dom";
import { CloseIcon } from "../../icons"
import Post from "./Post"

function PostModal() {
  const classes = usePostModalStyles();
  const { postId } = useParams()
  const history = useHistory();
  // Modal.setAppElement("Post View")
  return <>
    <Modal
      ariaHideApp={false}
      isOpen
      overlayClassName={classes.overlay}
      onRequestClose={() => history.goBack()}
      style={{
        content: {
          display: 'flex',
          alignItems: 'center',
          maxWidth: 935,
          width: "100%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%,-50%)",
          marign: 0,
          padding: 0,
          overflow: "none",
          WebkitOverflowScrolling: "touch"
        }
      }}
    >
      <Post id={postId} />
    </Modal>
    <div className={classes.close} onClick={() => history.goBack()}>
      <CloseIcon />
    </div>
  </>;
}

export default PostModal;
