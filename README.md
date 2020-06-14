# xlsx-mongo-track-import

Node.js app to extract contracts from xlsx sheet and store in MongoDB database

## Installation

run `npm install` to install the required packages

## Database setup

The script is configured to use a MongoDB database running on localhost.

### Database name:

- `tracksDb`

### Collections

- `contracts` - collection to store the contracts
- `tracks` - collection to store the imported tracks

## Running the script

Run using either of the following commands with {{inputFile}} containing the full path to the .xlsx file to be processed

```
npm start -- --input={{inputFile}}
```

or

```
node app.js --input={{inputFile}}
```
