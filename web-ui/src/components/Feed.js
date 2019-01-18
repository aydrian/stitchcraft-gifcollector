import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const Feed = ({ gifs }) => {
  return (
    <Card.Group centered stackable>
      {gifs.map(gif => {
        return (
          <Card key={gif._id}>
            <Image src={gif.gif_url} />
            <Card.Content>
              <Card.Header>{gif.owner_email || gif.owner_id}</Card.Header>
              <Card.Description>{gif.description}</Card.Description>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

export default Feed
