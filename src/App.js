import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactsList from './components/ContactList/ContactList';
import { CSSTransition } from 'react-transition-group';
import './App.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    notify: false,
  };

  componentDidMount() {
    const persistedTasks = localStorage.getItem('contacts');
    if (persistedTasks) {
      this.setState({
        contacts: JSON.parse(persistedTasks),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getVisibleTasks() {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  addTask = (nameResult, numberResult) => {
    const { contacts } = this.state;
    const info = {
      id: uuidv4(),
      name: nameResult,
      number: numberResult,
    };

    if (
      contacts.find(contact =>
        contact.name.toLowerCase().includes(nameResult.toLowerCase()),
      )
    ) {
      this.setState({ notify: true });

      setTimeout(() => {
        this.setState({ notify: false });
      }, 3500);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, info],
        };
      });
    }
  };

  removeTask = taskId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== taskId),
      };
    });
  };

  render() {
    // const { contacts } = this.state;
    const visibleTasks = this.getVisibleTasks();

    return (
      <div>
        <CSSTransition
          in={this.state.notify}
          timeout={250}
          unmountOnExit
          classNames="alert-title"
        >
          <div className="alert">
            <h2 className="error-notify">
              This user name already in your contact list
            </h2>
          </div>
        </CSSTransition>

        <div className="phonebook">
          <CSSTransition
            in={true}
            appear={true}
            classNames="list"
            timeout={500}
          >
            <h2 className="phonebook-head">Phonebook</h2>
          </CSSTransition>
        </div>

        <ContactForm onAddTask={this.addTask} />

        <h2>Contacts</h2>
        <CSSTransition
          in={this.state.contacts.length > 0}
          classNames="list"
          timeout={2500}
          unmountOnExit
        >
          <ContactsList
            onChange={this.handleChange}
            onVisible={visibleTasks}
            onRemove={this.removeTask}
          />
        </CSSTransition>
      </div>
    );
  }
}
