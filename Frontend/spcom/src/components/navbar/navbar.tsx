import React from 'react';
import { observer } from 'mobx-react-lite';
import AppContext from '../contexts/app-context';
import LoggedInNavBar from './loggedInNavbar';
import LoggedOutNavBar from './loggedOutNavbar';

interface IProps {
  context: AppContext;
}

export default observer(function NavBar(props: IProps) {
  let { context } = props;

  if (context.isLoggedIn) {
    return <LoggedInNavBar context={context} />;
  } else {
    return <LoggedOutNavBar />;
  }
});
