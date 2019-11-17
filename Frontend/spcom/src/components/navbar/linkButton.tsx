import React from 'react';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router';
import { Path } from 'history';
import { Button } from '@material-ui/core';

// Button that integrates router-link functionality as well as on-Click

interface Routable extends RouteComponentProps {
  to: Path;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  history: History;
}

const LinkButton = (props: Routable) => {
  const {
    staticContext,
    // ⬆ filtering out props that `button` doesn’t know what to do with
    ...rest
  } = props;

  return (
    <Button
      color="inherit"
      {...rest}
      onClick={event => {
        props.onClick && props.onClick(event);
        props.history.push(props.to);
      }}
    />
  );
};

export default withRouter(LinkButton);
