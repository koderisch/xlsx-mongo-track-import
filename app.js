const yargonaut = require('yargonaut');
yargonaut.style('blue').style('blue', 'number').style('yellow', 'required').helpStyle('green.underline').errorsStyle('red.bold');

const yargs = require('yargs');
const xlsxImport = require('./services/xlsx-import');
const db = require('./services/db');
const processFields = require('./services/process-fields');

const Contract = require('./models/contract');
const Track = require('./models/track');

let errorArray = [];

// set up options for command line
const argv = yargs
  .option('input', {
    alias: 'i',
    description: 'Path to xlsx file to process',
    type: 'string',
    demand: true,
  })
  .alias('help', 'h').argv;

const INPUT_FILE = argv.input;

const processItems = async () => {
  const newContract = new Contract({ Name: 'Contract 1' });
  await newContract.save();

  const importedTracks = xlsxImport.xlsxToJson(INPUT_FILE);

  for (let i = 1; i < importedTracks.length; i++) {
    const importedTrack = importedTracks[i];
    let trackData = {};

    trackData.Title = processFields.clean(importedTrack['Title']);
    trackData.Version = processFields.clean(importedTrack['Version']);
    trackData.Artist = processFields.clean(importedTrack['Artist']);
    trackData.ISRC = processFields.cleanISRC(importedTrack['ISRC']);
    trackData.PLine = processFields.clean(importedTrack['P Line']);
    trackData.Aliases = processFields.convertToArray(importedTrack['Aliases']);

    cleanContractName = processFields.clean(importedTrack['Contract']);
    getContractReference = await Contract.findOne({ Name: cleanContractName });
    if (getContractReference) trackData.ContractID = getContractReference._id;

    if (getContractReference || cleanContractName === '') {
      const newTrack = new Track(trackData);
      await newTrack.save().catch((error) => {
        for (err in error.errors) {
          errorArray.push({ line: i + 2, error: error.errors[err].properties.message });
        }
      });
    } else {
      errorArray.push({ line: i + 2, error: 'Contract name does not exist in Contracts collection' });
    }
  }
  db.close();

  if (errorArray.length > 0) {
    console.log('The following lines were not imported due to errors');
    console.log(errorArray);
  } else {
    console.log('All tracks imported successfully');
  }
};

db.connect(processItems);
