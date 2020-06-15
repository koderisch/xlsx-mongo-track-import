# xlsx-mongo-track-import

Node.js app to extract contracts from xlsx sheet and store in MongoDB database

## Installation

run `npm install` to install the required packages

## Database setup

The script is configured to use a MongoDB database named `tracksDb`, running on localhost.

To use a different database connection set `DB_URI` in `.env` to the desired database URI.

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

Use the `--clear` switch to empty the collections before importing the data.

E.g.

```
npm start -- --input={{inputFile}} --clear=true
```

or

```
node app.js --input={{inputFile}} --clear=true
```
