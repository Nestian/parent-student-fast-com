import React from 'react';
import { observer } from 'mobx-react';
import AppContext from './contexts/app-context';
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  PropTypes
} from '@material-ui/core';
import GenericTextField from './generics/genericTextField';

// This component is responsible to render the presentation
// layout for a logged in student user. The student sees at
// any time, what is his current health status displayed to
// the relevant parent and if that status changes, indicates
// the parent with appropriate message. The successful
// submission of a message alerts the student user.

interface IProps {
  context: AppContext;
}

// To track, whether the status has changed, if so display
// input block, such that the student can send a message to parent.
// As well as a string state to track the message to be sent.
interface IState {
  displayInput: boolean;
  message: string;
}

@observer
export class StudentUser extends React.Component<IProps, IState> {
  private _context: AppContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      displayInput: false,
      message: ''
    };

    this._context = this.props.context;
    this.decideStatusColor = this.decideStatusColor.bind(this);
    this.displayStatus = this.displayStatus.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // The health status of the student should be in :
  // primary blue if student is doing well OR
  // secondary red if student is unwell
  decideStatusColor(): PropTypes.Color | any {
    let statusColor: PropTypes.Color = 'primary';
    if (!this._context.isHealthy) {
      statusColor = 'secondary';
    }
    return statusColor;
  }

  displayStatus(): string {
    let status: string = 'well';

    if (!this._context.isHealthy) {
      status = 'unwell';
    }

    return status;
  }

  // When the student indicates a health status change:
  //  1) An input message box to be send should be available.
  //  2) The new health status should be displayed for the user.
  handleStatusChange(e: any) {
    let status = !this._context.isHealthy;
    this.setState({ displayInput: true });
    this._context.isHealthy = status;
    this._context.messageSubmitted = false;

    this.decideStatusColor();
  }

  handleMessage(e: any) {
    this.setState({ message: e.target.value });
  }

  onSubmit = (e: any) => {
    // TODO: Test if this page is still rendered
    // after submission, without the below line
    this._context.isLoggedIn = true;
    console.log(this.state.message);
    // TODO: Post the message to the backend API
    this._context.messages.push(this.state.message);
    // indicate that the message has been submitted
    this._context.messageSubmitted = true;
    // to prepare the input box for a new mesage
    this.setState({ message: '' });
  };

  // Renders the input field for the message to be sent
  renderInput() {
    if (this.state.displayInput) {
      return (
        <form noValidate>
          <GenericTextField
            name={`Message to ${this._context.parentUserName}`}
            value={this.state.message}
            onChange={this.handleMessage}
          />
          <Button
            onClick={e => this.onSubmit(e)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      );
    } else return;
  }

  // Pop-up message for the user, when the message has
  // been successfully submitted.
  renderSubmissionMessage() {
    if (this._context.messageSubmitted) {
      return (
        <Typography color={this.decideStatusColor()}>
          Message sent to {this._context.userName}
        </Typography>
      );
    } else return;
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
            Welcome, {this._context.userName}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="primary"
          >
            Current status displayed to your parent:
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
            onClick={e => this.handleStatusChange(e)}
            fullWidth
            variant="contained"
            color={this.decideStatusColor()}
          >
            I am no longer feeling {this.displayStatus()}
          </Button>
          {this.renderInput()}
          {this.renderSubmissionMessage()}
        </div>
      </Container>
    );
  }
}

export default StudentUser;
