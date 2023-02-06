<img src="https://yt3.ggpht.com/ytc/AKedOLS6CuwrrOvURWxJNMZt0KjWetOmkT6MJIP8DuGItQ=s900-c-k-c0x00ffffff-no-rj" align="right" width="150" height="150"/>

# SharkScout PWA

SharkScout is a configurable PWA FRC robot scouting application for FRC team 226. It is a fast offline-first application that allows you to scout robots and teams without having to be connected to the internet by generating QRCodes and submitting it to the Backend Database. It also has the ability to submit data to Firebase when internet connection is available.

Configuring and Creating is Very Fast via the Customizable Options available through a JSON Schema

Note this app is pairs with the [SharkScout Backend](https://github.com/arnavs-0/SharkScout-Backend) which is a server that stores the data by scanning QR codes.

** Please Note: Documentation is still in the works. If you have any questions feel free to open an issue **

## Required Tools

- [Node.js](https://nodejs.org) version 12 LTS or greater (tested on Node.js 14.17.3)
- [Yarn](https://yarnpkg.com) version 1.22 or greater (tested on Yarn 1.22.17)
- [Git](https://git-scm.com) version 2.22 or greater (tested on Git 2.22.0)

## Setup Environment

_Must have created a Firebase Project_

1. `npm install -g firebase-tools`
2. `firebase login`
3. `yarn global add node-firestore-import-export`
4. `git clone https://github.com/arnavs-0/scouting-pwa.git`
5. `cd sharkscout-pwa`
6. `yarn`
7. In `.env` add the `REACT_APP_FIREBASE_API_KEY= REACT_APP_FIREBASE_AUTH_DOMAIN= REACT_APP_FIREBASE_DB_URL= REACT_APP_FIREBASE_PROJECT_ID= REACT_APP_FIREBASE_STORAGE_BUCKET= REACT_APP_FIREBASE_SENDER_ID= REACT_APP_FIREBASE_APP_ID= REACT_APP_FIREBASE_MEASUREMENT_ID=` from the Firebase console.
8. In `src/data/forms` change the Scouting Forms, an example file is shown
9. In `src/utils/label` change the JSON labels that will be exported in the order of the scouting form schema
10. In `src/utils/config.json` change the config file
11. In the root dir run `yarn start` to start the app.

## Components

| Component               | Status | id             |
| ----------------------- | ------ | -------------- |
| Boolean (Switch/Toggle) | ✅     | `boolean`      |
| Checkbox Select         | 🚧     | `checkbox`     |
| Autocomplete Select     | 🚧     | `autocomplete` |
| Counter                 | ✅     | `counter`      |
| Date                    | 📝     | TBA            |
| Drawable Canvas         | 📝     | TBA            |
| Dropdown                | ✅     | `dropdown`     |
| Header                  | ✅     | `header`       |
| Image                   | ✅     | `image`        |
| Image Select            | 📝     | TBA            |
| Label                   | ✅     | `label`        |
| Number                  | ✅     | `number`       |
| Radio Select            | ✅     | `radio`        |
| Range                   | 📝     | TBA            |
| Text                    | ✅     | `text`         |
| Textarea                | ✅     | `textarea`     |
| Timer                   | 📝     | TBA            |

### Key

✅ Complete
🚧 Work in Progress
📝 Planned

This app was used initally by Team 226 during the 2022 Season - Rapid React and will be continously improved and utilized for the upcoming season
