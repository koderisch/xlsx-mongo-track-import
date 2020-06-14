const expect = require('chai').expect;
const processFields = require('../services/process-fields.js');

describe('Process Fields functions', () => {
  describe('Clean text', () => {
    it('removes leading and trailing spaces', () => {
      expect(processFields.clean('  text  ')).to.equal('text');
      expect(processFields.clean('text  ')).to.equal('text');
      expect(processFields.clean(' text')).to.equal('text');
    });
    it('does not remove spaces within the text ', () => {
      expect(processFields.clean('more text with spaces')).to.equal('more text with spaces');
    });
    it('removes line breaks', () => {
      expect(processFields.clean('text\n')).to.equal('text');
      expect(processFields.clean('text\r')).to.equal('text');
      expect(processFields.clean('\r\ntext\r\n')).to.equal('text');
    });
  });

  describe('Clean ISRC codes', () => {
    it('removes all characters apart from A-Z and 0-9', () => {
      expect(processFields.cleanISRC('GBT64-7363737')).to.equal('GBT647363737');
      expect(processFields.cleanISRC(' GBT- !@£$%^&*()_+-=-23 73 63737  ')).to.equal('GBT237363737');
    });
    it('transforms all characters to UPPERCASE', () => {
      expect(processFields.cleanISRC('abcde647363737')).to.equal('ABCDE647363737');
    });
  });

  describe('Convert to Array', () => {
    it('transforms text separated by semicolon into array', () => {
      expect(processFields.convertToArray('text1')).to.eql(['text1']);
      expect(processFields.convertToArray('text1;text2')).to.eql(['text1', 'text2']);
      expect(processFields.convertToArray('text1 ; text2')).to.eql(['text1', 'text2']);
      expect(processFields.convertToArray('text 1;text 2')).to.eql(['text 1', 'text 2']);
      expect(processFields.convertToArray('text1;;text2')).to.eql(['text1', 'text2']);
      expect(processFields.convertToArray(';text1;text2;')).to.eql(['text1', 'text2']);
      expect(processFields.convertToArray(' ; text1 ;  text2 ; text3; ')).to.eql(['text1', 'text2', 'text3']);
    });
  });
});
