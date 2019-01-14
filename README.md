# Gif Collector

An application created using [MongoDB Stitch](https://www.mongodb.com/cloud/stitch) and React.js to demonstrate [QueryAnywhere](https://docs.mongodb.com/stitch/getting-started/configure-rules-based-access-to-mongodb/). It will save the URL of an animiated gif and allow you to share it with another user. The Live-coding video for this app can be found on the [StitchCraft YouTube](https://youtu.be/19nwCRsFqcM).

[![Powered by Stitch](http://badge.learnstitch.com/?appid=stitchcraft-gifcollector-ystof)](http://cloud.mongodb.com)

## web-ui

React.js application created using [Create React App](https://github.com/facebook/create-react-app).

## stitch-app

Exported (as template) [Stitch app](https://docs.mongodb.com/stitch/import-export/export-stitch-app/).

## Scripts

The following scripts will assist in the initial setup of your Stitch Application.

## Requirements:

- Install the [stitch-cli](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/)
- Generate an [API Key](https://docs.atlas.mongodb.com/configure-api-access/#generate-api-keys)
- Create a `.env` file like the following

```
export STITCH_API_KEY=<API_KEY>
export STITCH_USERNAME=<CLOUD_USERNAME>
export STITCH_APPID=<APPID>
```

### deploy.sh

Deploy current code using `./deploy.sh` in the root of the project

```
> ./deploy.sh
```

### export.sh

Export the project code template using `./export.sh` in the root of the project.

```
> ./export.sh
```

**Note:** This exports the application configuration without any service ID values, including the App ID.
