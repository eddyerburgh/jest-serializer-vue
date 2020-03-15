const helpers = require('../helpers.js');
const index = require('../../index.js');

describe('Index', () => {
  test('Undefined', () => {
    expect(index.print(undefined))
      .toMatchSnapshot();
  });

  test('Load options from alternate path', () => {
    jest.doMock('../../vue.config.js', function () {
      return {
        jestSerializer: {
          removeComments: true
        }
      };
    });

    expect(index.print('<div data-test="a"><div><!----></div></div>'))
      .toMatchSnapshot();
  });

  test('Empty vnode', () => {
    helpers.mockSettings({ stringifyObjects: true });

    const wrapper = {
      isVueInstance: function () {},
      html: function () {
        return '';
      },
      vnode: {
        children: [
          false
        ]
      }
    };

    expect(index.print(wrapper))
      .toMatchSnapshot();
  });

  test('Vue config is empty', () => {
    jest.doMock('../../vue.config.js', function () {});

    expect(index.print('<div data-test="a"><div><!----></div></div>'))
      .toMatchSnapshot();
  });
});
