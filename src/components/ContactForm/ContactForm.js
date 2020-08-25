import React, { Component } from 'react';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onAddTask(this.state.name, this.state.number);

    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Name
            <br></br>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            ></input>
          </label>
          <br></br>
          <label>
            Number
            <br></br>
            <input
              onChange={this.handleChange}
              value={this.state.number}
              name="number"
            ></input>
          </label>
          <br></br>
          <button type="submit">Add contact</button>
          <br></br>
        </form>
      </div>
    );
  }
}
