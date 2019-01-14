import React, { Component } from 'react'
import {
  Stitch,
  UserPasswordCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import { Container, Header, Button } from 'semantic-ui-react'

import Login from './components/Login'
import AddGif from './components/AddGif'

class App extends Component {
  constructor(props) {
    super(props)

    this.appId = 'stitchcraft-gifcollector-ystof'

    this.state = { isAuthed: false }
  }

  login = async (email, password) => {
    const { isAuthed } = this.state

    if (isAuthed) {
      return
    }

    const credential = new UserPasswordCredential(email, password)
    await this.client.auth.loginWithCredential(credential)
    this.setState({ isAuthed: true })
  }

  handleAddGif = async (gif_url, description) => {
    console.log('Adding gif')
    this.mongodb
      .db('data')
      .collection('gifs')
      .insertOne({
        gif_url,
        description,
        owner_id: this.client.auth.user.id
      })
      .then(result => console.log)
      .catch(err => console.log)
  }

  componentDidMount() {
    this.client = Stitch.initializeAppClient(this.appId)
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )
    const isAuthed = this.client.auth.isLoggedIn
    this.setState({ isAuthed })
  }

  render() {
    const { isAuthed } = this.state
    return (
      <Container>
        <Header as="h1">Gif Collector</Header>
        {isAuthed ? (
          <div>
            I'm Authed! <AddGif handleAddGif={this.handleAddGif} />
            <Button
              primary
              onClick={() => {
                this.client.auth.logout()
                this.setState({ isAuthed: false })
              }}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Login loginUser={this.login} />
        )}
      </Container>
    )
  }
}

export default App
