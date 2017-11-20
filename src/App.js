import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import Messages from './components/Messages'

class App extends Component {

  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]
  }

  // Will change all messages where message.matchProperty === matchValue
  // For each matched message, message[propertyToUpdate] will be updated
  //  according to propUpdateFunction
  // Will then rebuild messages and set state
  alterMessages = (matchProperty, matchValue, propertyToUpdate, propUpdateFunction) => {
    const updatedMessages = this.state.messages
      .filter(m=>m[matchProperty] === matchValue)
      .map(m=>({ ...m, [propertyToUpdate]: propUpdateFunction(m[propertyToUpdate])}))
    const otherMessages = this.state.messages
      .filter(m=>m[matchProperty] !== matchValue)
    const newMessageArr = updatedMessages
      .concat(otherMessages)
      .sort((a,b)=>a.id-b.id)
    this.setState({ messages: newMessageArr })
  }

  //Makes it slightly easier to just match selected messages
  alterSelectedMessages = (propToUpdate, propUpdateFunction) => {
    this.alterMessages('selected', true, propToUpdate, propUpdateFunction)
  }

  toggleMessageProperty = (messageId, propToUpdate) => {
    this.alterMessages('id', messageId, propToUpdate, prop => !prop)
  }

  setAllMessageProperty = (propToUpdate, newValue) => {
    this.alterMessages(null, undefined, propToUpdate, prop => newValue)
  }

  setSelectedMessageProperty = (propToUpdate, newValue) => {
    this.alterSelectedMessages(propToUpdate, prop => newValue)
  }

  deleteSelectedMessages = () => {
    this.setState({messages: this.state.messages.filter(m=>!m.selected)})
  }

  addLabelToSelected = (newLabel) => {
    this.alterSelectedMessages('labels', prop =>[...new Set([...prop, newLabel])])
  }

  removeLabelFromSelected = (removedLabel) => {
    this.alterSelectedMessages('labels', prop => prop.filter(l=>l !== removedLabel))
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          setAllMessageProperty={this.setAllMessageProperty}
          setSelectedMessageProperty={this.setSelectedMessageProperty}
          deleteSelectedMessages={this.deleteSelectedMessages}
          addLabelToSelected={this.addLabelToSelected}
          removeLabelFromSelected={this.removeLabelFromSelected}
        />
        <Messages
          messages={this.state.messages}
          toggleMessageProperty={this.toggleMessageProperty}
        />
      </div>

    )
  }
}

export default App;
