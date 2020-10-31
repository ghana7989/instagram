import React from "react";
import { useLoginPageStyles } from "../styles";
import SEO from "../components/shared/Seo";
import { Button, Card, CardHeader, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SIGNUP_PAGE } from "../Routes";
import FacebookIconBlue from "../images/facebook-icon-blue.svg"
import FacebookIconWhite from "../images/facebook-icon-white.png"

function LoginPage() {
  const classes = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form>
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
              >Log In</Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine}></div>
              <div>
                <Typography variant="body2" color="textSecondary">OR</Typography>
              </div>
              <div className={classes.orLine}></div>
            </div>
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgot Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography variant="body2" align="right">
              Don't have an account?
            </Typography>
            <Link to={process.env.PUBLIC_URL + "/accounts/emailSignup"}>
              <Button color="primary" className={classes.signUpButton}>Sign Up</Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export function LoginWithFacebook({ color, iconColor,variant }) {
  const classes = useLoginPageStyles();
  const facebookIcon = iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite

  return (
    <Button
      fullWidth
      color={color}
      variant={variant}
    >
      <img src={facebookIcon} alt="Facebook-Icon" className={classes.facebookIcon} />
      Log in with Facebook
    </Button>
  )
}

export default LoginPage;
