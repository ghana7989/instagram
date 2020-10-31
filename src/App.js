import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FEED_PAGE, EXPLORE_PAGE, PROFILE_PAGE, POST_PAGE, EDIT_PROFILE_PAGE, LOGIN_PAGE, SIGNUP_PAGE, ERROR404 } from "./Routes";
import FeedPage from "./pages/feed";
import ExplorePage from "./pages/explore";
import ProfilePage from "./pages/profile";
import PostPage from "./pages/post";
import EditProfilePage from "./pages/edit-profile";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import NotFoundPage from "./pages/not-found";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={FEED_PAGE} component={FeedPage} />
        <Route exact path={EXPLORE_PAGE} component={ExplorePage} />
        <Route exact path="/:userName" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route exact path={EDIT_PROFILE_PAGE} component={EditProfilePage} />
        <Route exact path={LOGIN_PAGE} component={LoginPage} />
        <Route exact path={SIGNUP_PAGE} component={SignUpPage} />
        <Route path={ERROR404} component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
