import React from 'react';
import { TextField } from '@material-ui/core';

// To auto generate repeated properties of a text field
// used throughout admin pages, takes the unique properties
// that would identify the text field's purpose

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
