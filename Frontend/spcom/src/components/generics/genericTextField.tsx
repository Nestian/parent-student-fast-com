import React from 'react';
import { TextField } from '@material-ui/core';

// This component is the text field format which
// is consistently used throughout the application

interface IProps {
  name: string;
  value: unknown;
  onChange(e: any): void;
  type?: string;
  InputLabelProps?: any;
}

export default class GenericTextField extends React.Component<IProps> {
  render() {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name={this.props.name}
        label={this.props.name}
        type={this.props.type ? this.props.type : this.props.name}
        id={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
        InputLabelProps={this.props.InputLabelProps}
      />
    );
  }
}
