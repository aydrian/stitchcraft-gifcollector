import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class AddGif extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gif_url: '',
      description: ''
    }
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      ...prevState.userInput,
      [name]: value
    }))
  }

  render() {
    const { gif_url, description } = this.state
    const { handleAddGif } = this.props
    return (
      <Form
        onSubmit={() => {
          console.log(gif_url, description)
          handleAddGif(gif_url, description)
          this.setState({ gif_url: '', description: '' })
        }}
      >
        <Form.Input
          label="Gif URL"
          name="gif_url"
          defaultValue={gif_url}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Description"
          name="description"
          defaultValue={description}
          onChange={this.handleChange}
        />
        <Form.Button type="submit" primary>
          Add
        </Form.Button>
      </Form>
    )
  }
}

export default AddGif
