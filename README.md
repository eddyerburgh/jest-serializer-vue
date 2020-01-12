# jest-serializer-vue-tjw

Jest Vue snapshot serializer


## Why use this over the Edd's?

1. This version automatically removes `data-test="whatever"` from your snapshots
1. This version has much better snapshot defaults
1. This version lets you control your snapshot formatting with an API
1. Edd is busy and not maintaining his Vue repos right now. Cool dude though.


## Installation

```
npm install --save-dev jest-serializer-vue-tjw
```


## Usage

You need to tell Jest to use the serializer. Add this to your Jest config:

```
"snapshotSerializers": [
  "<rootDir>/node_modules/jest-serializer-vue-tjw"
]
```

And your snapshot tests will be pretty printed 💅

```js
import { shallowMount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent.vue', () => {
  describe('Created', () => {
    test('Renders correctly with default props', () => {
      const wrapper = shallowMount(MyComponent);

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
});
```


## API

**ALL SETTINGS ARE OPTIONAL**. Below is the defaults. If you like them, you don't need to add anything to your Vue config.

In your `vue.config.js` file:

```js
module.exports = {
  pluginOptions: {
    jestSerializer: {
      removeDataTest: true,
      removeServerRendered: true,
      // All available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
      pretty: {
        indent_char: ' ',
        indent_inner_html: true,
        indent_size: 2,
        inline: [],
        sep: '\n',
        unformatted: ['code', 'pre']
      }
    }
  }
};
```

Setting              | Default           | Description
:--                  | :--               | :--
removeDataTest       | `true`            | Removes `data-test="whatever"` from your snapshots if true.
removeServerRendered | `true`            | Removes `data-server-rendered="true"` from your snapshots if true.
pretty               | See above example | These options are passed into `pretty` to format the snapshot. To use `pretty`'s defaults pass in `true`. [See all available options here](https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js).
