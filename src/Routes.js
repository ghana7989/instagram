import { defaultUser } from "./data";

export const FEED_PAGE = process.env.PUBLIC_URL + '/';
export const EXPLORE_PAGE = process.env.PUBLIC_URL + "/explore";
export const PROFILE_PAGE = (user)=>process.env.PUBLIC_URL + `/${user}`;
export const POST_PAGE = (postId) => process.env.PUBLIC_URL + `/p/${postId}`;
export const EDIT_PROFILE_PAGE = process.env.PUBLIC_URL + "/accounts/edit";
export const LOGIN_PAGE = process.env.PUBLIC_URL + "/accounts/login";
export const SIGNUP_PAGE = process.env.PUBLIC_URL + "/accounts/emailSignup";
export const ERROR404 = "*";