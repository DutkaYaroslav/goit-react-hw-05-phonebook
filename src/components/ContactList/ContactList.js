import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ContactList.css';

const contacts = ({ onChange, onVisible, onRemove }) => (
  <div>
    <label>
      find contacts by name
      <input onChange={onChange} name="filter"></input>
    </label>
    <TransitionGroup component="ul">
      {onVisible.map(visibleTask => (
        <CSSTransition key={visibleTask.id} classNames="list" timeout={250}>
          <li className="name-list">
            {visibleTask.name}:{visibleTask.number}
            <button
              type="button"
              className="close-button"
              onClick={() => onRemove(visibleTask.id)}
            >
              delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

export default contacts;
