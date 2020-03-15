const helpers = require('../../src/helpers.js');

describe('Helpers', () => {
  describe('Log', () => {
    let consoleLog;
    beforeEach(() => {
      consoleLog = console.log;
      console.log = jest.fn();
    });

    afterEach(() => {
      console.log = consoleLog;
    });

    test('No message', () => {
      helpers.log(null, { verbose: true });

      expect(console.log)
        .not.toHaveBeenCalled();
    });

    test('No options', () => {
      helpers.log('A');

      expect(console.log)
        .not.toHaveBeenCalled();
    });

    test('Options empty', () => {
      helpers.log('A', {});

      expect(console.log)
        .not.toHaveBeenCalled();
    });

    test('Verbose false', () => {
      helpers.log('A', { verbose: false });

      expect(console.log)
        .not.toHaveBeenCalled();
    });

    test('Verbose true', () => {
      helpers.log('A', { verbose: true });

      expect(console.log)
        .toHaveBeenCalledWith('Jest-Serializer-Vue-TJW:', 'A');
    });
  });

  describe('cloneVnode', () => {
    test('No vnode', () => {
      expect(helpers.cloneVnode({}, {}, jest.fn()))
        .toEqual(undefined);
    });
  });
});
