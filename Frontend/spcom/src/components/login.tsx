import React from 'react';
import { observer } from 'mobx-react';
import Axios from 'axios';
import SPCom from '../SPCom.png';
import AppContext from './contexts/app-context';
import { Container, CssBaseline, Typography, Button } from '@material-ui/core';
import GenericTextField from './generics/genericTextField';

interface IProps {
  context: AppContext;
}

interface IState {
  Email: string;
  Password: string;
}

@observer
export class Login extends React.Component<IProps, IState> {
  private _context: AppContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      Email: '',
      Password: ''
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._context = props.context;
  }

  handleEmail(e: any) {
    this.setState({ Email: e.target.value });
  }

  handlePassword(e: any) {
    this.setState({ Password: e.target.value });
  }

  onSubmit = (e: any) => {
    this._context.email = this.state.Email;
    this._context.password = this.state.Password;

    e.preventDefault();

    var form: IState = {
      Email: this.state.Email,
      Password: this.state.Password
    };

    // TODO: POST to Back end API
    //
    // Axios({
    //   method: 'post',
    //   url: ``,
    //   data: form,
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(response => console.log(response));

    this.setState({
      Email: '',
      Password: ''
    });

    // TEMP: Context Login Simulation
    this._context.isLoggedIn = true;
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* TODO: Add image here */}
        <img
          className="loginImage"
          src={SPCom}
          alt="test"
          style={{ maxWidth: '80%', marginTop: '20%' }}
        />
        <div>
          <Typography component="h1" variant="h5" align="left" color="primary">
            Sign in
          </Typography>
        </div>
        <form noValidate>
          <GenericTextField
            name={'Email'}
            value={this.state.Email}
            onChange={this.handleEmail}
          />
          <GenericTextField
            name={'Password'}
            value={this.state.Password}
            onChange={this.handlePassword}
          />
          <Button
            onClick={e => this.onSubmit(e)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Typography component="h6" variant="h6" align="left" color="primary">
            Don't have an account? Click here to register.
          </Typography>
        </form>
      </Container>
    );
  }
}

export default Login;
