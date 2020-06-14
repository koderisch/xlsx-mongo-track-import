'use strict';

const clean = (text) => {
  if (!text) return '';
  const trimmedText = text.trim();
  return trimmedText.replace(/[\r\n]/g, '');
};

const cleanISRC = (text) => {
  if (!text) return '';
  const upperCaseText = text.toUpperCase();
  const onlyCharsAndNumbers = upperCaseText.replace(/[^A-Za-z0-9]+/g, '');
  return onlyCharsAndNumbers;
};

const convertToArray = (text) => {
  const newArray = text.split(';');
  const cleanArray = newArray.map(clean);
  const filteredArray = cleanArray.filter(function (text) {
    return text != '';
  });
  return filteredArray;
};

exports.clean = clean;
exports.cleanISRC = cleanISRC;
exports.convertToArray = convertToArray;
