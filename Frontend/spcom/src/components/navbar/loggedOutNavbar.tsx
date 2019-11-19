import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// The navbar to be rendered if the user is not yet
// logged in to our application

// Default Material UI styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

// The logged out navbar has a login tab
export default function LoggedOutNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ minHeight: '80px' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SPCom
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
