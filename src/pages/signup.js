import React from "react";
import { useSignUpPageStyles } from "../styles";
import SEO from "../components/shared/Seo";
import { Link } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { LoginWithFacebook } from "./login";

function SignUpPage() {
  const classes = useSignUpPageStyles();

  return (
    <>
      <SEO title="Sign Up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              sign up to see photos and videos from your friends
            </Typography>
            <LoginWithFacebook color="primary" iconColor="white" variant="contained" />
            <div className={classes.orContainer}>
              <div className={classes.orLine}></div>
              <div>
                <Typography variant="body2" color="textSecondary">OR</Typography>
              </div>
              <div className={classes.orLine}></div>
            </div>
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Mobile Number or Email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >Sign Up</Button>
            </form>
            <p style={{display:"block",color:"rgba(142,142,142,1)",textAlign:"center"}}>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
          </Card>
          <Card className={classes.loginCard}>
            <Typography variant="body2" align="right">
              Have an account?
            </Typography>
            <Link to={process.env.PUBLIC_URL + "/accounts/login"}>
              <Button color="primary" className={classes.loginButton}>Login</Button>
            </Link>
          </Card>
        </article>
      </section>
    </>

  );
}

export default SignUpPage;
