import React, { Component } from 'react'

import { Form, Icon, Message } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      userInput: { ...prevState.userInput, [name]: value }
    }))
  }

  render() {
    const {
      errorMessage,
      userInput: { email, password }
    } = this.state

    const { loginUser } = this.props

    return (
      <Form
        onSubmit={() => {
          loginUser(email, password).catch(err => {
            this.setState({ errorMessage: err.message })
          })
        }}
      >
        <Form.Input
          fluid
          label="Email"
          name="email"
          placeholder="someone@example.com"
          defaultValue={email}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Password"
          name="password"
          type="password"
          placeholder="password"
          defaultValue={password}
          onChange={this.handleChange}
        />
        {errorMessage && (
          <Message negative header="Login Failed" content={errorMessage} />
        )}
        <Form.Button type="submit" primary>
          <Icon name="mail" />
          Log In
        </Form.Button>
      </Form>
    )
  }
}

export default Login
