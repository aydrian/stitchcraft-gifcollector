import React, { Component } from 'react'
import {
  Stitch,
  UserPasswordCredential,
  RemoteMongoClient
} from 'mongodb-stitch-browser-sdk'
import { Container, Header, Button } from 'semantic-ui-react'

import Login from './components/Login'
import AddGif from './components/AddGif'
import Feed from './components/Feed'

class App extends Component {
  constructor(props) {
    super(props)

    this.appId = 'stitchcraft-gifcollector-ystof'

    this.state = { isAuthed: false, gifs: [], user_email: '' }
  }

  login = async (email, password) => {
    const { isAuthed } = this.state

    if (isAuthed) {
      return
    }

    const credential = new UserPasswordCredential(email, password)
    await this.client.auth.loginWithCredential(credential)
    this.setState({
      isAuthed: true,
      user_email: this.client.auth.user.profile.email
    })
    this.getGifs()
  }

  logout = async () => {
    this.client.auth.logout()
    this.setState({ isAuthed: false, gifs: [], user_email: '' })
  }

  handleAddGif = async (gif_url, description) => {
    console.log('Adding gif')
    this.mongodb
      .db('data')
      .collection('gifs')
      .insertOne({
        gif_url,
        description,
        owner_id: this.client.auth.user.id,
        owner_email: this.client.auth.user.profile.email
      })
      .then(result => {
        console.log(result)
        this.getGifs()
      })
      .catch(err => console.log)
  }

  componentDidMount() {
    this.client = Stitch.initializeAppClient(this.appId)
    this.mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )
    const isAuthed = this.client.auth.isLoggedIn
    if (isAuthed) {
      this.setState({
        isAuthed,
        user_email: this.client.auth.user.profile.email
      })
      this.getGifs()
    }
  }

  getGifs() {
    this.mongodb
      .db('data')
      .collection('gifs')
      .find({})
      .toArray()
      .then(result => {
        this.setState({ gifs: result })
      })
  }

  render() {
    const { isAuthed, gifs, user_email } = this.state
    return (
      <Container>
        <Header as="h1">Gif Collector</Header>
        {isAuthed ? (
          <div>
            <Header as="h3">
              Welcome, {user_email || ''}{' '}
              <Button primary onClick={this.logout} size="tiny">
                Log out
              </Button>
            </Header>
            <AddGif handleAddGif={this.handleAddGif} />
            {gifs.length > 0 ? (
              <Feed gifs={gifs} />
            ) : (
              <Header as="h4">
                No Gifs to display.{' '}
                <span role="img" aria-label="Sad Face">
                  😕
                </span>
              </Header>
            )}
          </div>
        ) : (
          <Login loginUser={this.login} />
        )}
      </Container>
    )
  }
}

export default App
