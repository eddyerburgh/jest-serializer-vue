const helpers = require('../../src/helpers.js');

describe('Helpers', () => {
  describe('functionRegex', () => {
    let pattern = helpers.functionRegex;

    test('Patterns that match', () => {
      let matchers = [
        'function () {}',
        'function () { return; }',
        'function () { return true; }',
        'function () {\n  return true;\n}',
        'function (arg) {}',
        'function (arg) { return; }',
        'function (arg) { return true; }',
        'function (arg) {\n  return true;\n}',
        'function (arg, arg2) {}',
        'function (arg, arg2) { return; }',
        'function (arg, arg2) { return true; }',
        'function (arg, arg2) {\n  return true;\n}',
        'function (){}',
        'function (){ return; }',
        'function (){ return true; }',
        'function (){\n  return true;\n}',
        'function (arg){}',
        'function (arg){ return; }',
        'function (arg){ return true; }',
        'function (arg){\n  return true;\n}',
        'function (arg, arg2){}',
        'function (arg, arg2){ return; }',
        'function (arg, arg2){ return true; }',
        'function (arg, arg2){\n  return true;\n}',
        'function named () {}',
        'function named () { return; }',
        'function named () { return true; }',
        'function named () {\n  return true;\n}',
        'function named (arg) {}',
        'function named (arg) { return; }',
        'function named (arg) { return true; }',
        'function named (arg) {\n  return true;\n}',
        'function named (arg, arg2) {}',
        'function named (arg, arg2) { return; }',
        'function named (arg, arg2) { return true; }',
        'function named (arg, arg2) {\n  return true;\n}',
        'function named (){}',
        'function named (){ return; }',
        'function named (){ return true; }',
        'function named (){\n  return true;\n}',
        'function named (arg){}',
        'function named (arg){ return; }',
        'function named (arg){ return true; }',
        'function named (arg){\n  return true;\n}',
        'function named (arg, arg2){}',
        'function named (arg, arg2){ return; }',
        'function named (arg, arg2){ return true; }',
        'function named (arg, arg2){\n  return true;\n}',
        'function named() {}',
        'function named() { return; }',
        'function named() { return true; }',
        'function named() {\n  return true;\n}',
        'function named(arg) {}',
        'function named(arg) { return; }',
        'function named(arg) { return true; }',
        'function named(arg) {\n  return true;\n}',
        'function named(arg, arg2) {}',
        'function named(arg, arg2) { return; }',
        'function named(arg, arg2) { return true; }',
        'function named(arg, arg2) {\n  return true;\n}',
        'function named(){}',
        'function named(){ return; }',
        'function named(){ return true; }',
        'function named(){\n  return true;\n}',
        'function named(arg){}',
        'function named(arg){ return; }',
        'function named(arg){ return true; }',
        'function named(arg){\n  return true;\n}',
        'function named(arg, arg2){}',
        'function named(arg, arg2){ return; }',
        'function named(arg, arg2){ return true; }',
        'function named(arg, arg2){\n  return true;\n}'
      ];

      // Non-english symbols
      matchers.push('function funkcjonować (spór, wywód) { return "powrót"; }');

      let matched = matchers.filter((match) => {
        return !pattern.test(match);
      });

      if (matched.length) {
        console.log('The following should be matched by the Regex, but wasn\'t');
        console.log(JSON.stringify(matched, null, 2));
      }

      expect(matched.length)
        .toEqual(0);
    });

    test('Patterns that don\'t match', () => {
      let matchers = [
        'junk',
        '() => {}',
        'function (a word used in programming) is typically followed by curly braces, ie {}'
      ];

      let matched = matchers.filter((match) => {
        return pattern.test(match);
      });

      if (matched.length) {
        console.log('The following should NOT be matched by the Regex, but was');
        console.log(JSON.stringify(matched, null, 2));
      }

      expect(matched.length)
        .toEqual(0);
    });
  });

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
