import React from 'react';
import { observer } from 'mobx-react';
import AppContext from './contexts/app-context';
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  PropTypes,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

// This component is responsible to render the presentation layer for
// a logged in parent user. The parent user should at any time see the
// current health status of the relevant student user and have the option
// to choose whether to display recent messages send by the student as well.

interface IProps {
  context: AppContext;
}

// To track, whether the parent wants to see student messages
interface IState {
  displayMessages: boolean;
}

@observer
export class ParentUser extends React.Component<IProps, IState> {
  private _context: AppContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      displayMessages: false
    };

    this._context = this.props.context;
    this.decideStatusColor = this.decideStatusColor.bind(this);
    this.displayStatus = this.displayStatus.bind(this);
    this.displayMessages = this.displayMessages.bind(this);
  }

  // The health status of the relevant student should be in :
  // primary blue if student is doing well OR
  // secondary red if student is unwell
  decideStatusColor(): PropTypes.Color | any {
    let statusColor: PropTypes.Color = 'primary';
    if (!this._context.isHealthy) {
      statusColor = 'secondary';
    }
    return statusColor;
  }

  // To indicate the current health status of the student
  displayStatus(): string {
    let status: string = 'well';

    if (!this._context.isHealthy) {
      status = 'unwell';
    }

    return status;
  }

  // Hide / Display the messages on click
  handleMessagesClick(e: any) {
    let display = !this.state.displayMessages;
    this.setState({ displayMessages: display });
  }

  // Functions below are responsible to render the messages
  // sent by the relevant ...

  // Each message text is a list item
  renderMessages(text: string) {
    return (
      <ListItem button key={text}>
        <ListItemText primary={text} />
      </ListItem>
    );
  }

  // All text messages form a list
  MapMessages() {
    return (
      <List>
        {this._context.messages.map(text => this.renderMessages(text))}
      </List>
    );
  }

  displayMessages() {
    if (this.state.displayMessages) {
      return <div style={{ textAlign: 'left' }}>{this.MapMessages()}</div>;
    }
    return;
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="primary"
            style={{ marginTop: '20%', marginBottom: '20%' }}
          >
            Welcome, {this._context.parentUserName}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="primary"
          >
            {this._context.userName} is:
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color={this.decideStatusColor()}
            style={{ marginTop: '16px', marginBottom: '16px' }}
          >
            {this.displayStatus()}
          </Typography>
          <Button
            onClick={e => this.handleMessagesClick(e)}
            fullWidth
            variant="contained"
            color={this.decideStatusColor()}
          >
            Messages from {this._context.userName}
          </Button>
          {this.displayMessages()}
        </div>
      </Container>
    );
  }
}

export default ParentUser;
