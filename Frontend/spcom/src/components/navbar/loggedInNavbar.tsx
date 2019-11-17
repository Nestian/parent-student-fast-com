import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LinkButton from './linkButton';
import { observer } from 'mobx-react-lite';
import AppContext from '../contexts/app-context';

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

interface IProps {
  context: AppContext;
}

export default observer(function LoggedInNavBar(props: IProps) {
  let { context } = props;
  const classes = useStyles();

  const handleLogout = async () => {
    context.isLoggedIn = false;
  };

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
            SpCom
          </Typography>
          <Button color="inherit">{context.userName}</Button>
          <LinkButton to="/" onClick={handleLogout}>
            Logout
          </LinkButton>
        </Toolbar>
      </AppBar>
    </div>
  );
});
