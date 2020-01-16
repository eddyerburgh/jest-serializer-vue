# jest-serializer-vue-tjw

[![Build Status](https://travis-ci.org/tjw-lint/jest-serializer-vue-tjw.svg?branch=master)](https://travis-ci.org/tjw-lint/jest-serializer-vue-tjw) ![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen) ![Code of Conduct: No Ideologies](https://img.shields.io/badge/CoC-No%20Ideologies-blue)

Jest Vue snapshot serializer


## Why use this over the Edd's?

1. Both versions automatically remove `data-server-rendered="true"`.
1. This version automatically removes `data-test="whatever"` from your snapshots (also `data-testid` and `data-test-id`).
1. This version can optionally remove `data-qa="whatever"` from your snapshots (disabled by default, see API for reasoning).
1. This version automatically removes `data-v-1234abcd=""` from snapshots.
1. This version will display JSON data stored in HTML attributes instead of `href="[object Object]"`
1. This version has much better snapshot defaults.
1. This version lets you control your snapshot formatting with an API.
1. Edd is busy and not maintaining his Vue repos right now. Cool dude though :sunglasses:.


## What do you mean by "much better snapshot defaults"?

This is the before and after of using the default "pretty" options, and my options (which you can change with the API below, something Edd's version does not offer).

![Difference between the snapshot settings, my version makes the formatting cleaner and easier to see what actually changed in a failing snapshot](https://user-images.githubusercontent.com/4629794/53278405-f8685880-36d6-11e9-92f0-127e0673a23a.gif)


## Usage

1. `npm install --save-dev jest-serializer-vue-tjw`
1. You need to tell Jest to use the serializer. Add this to your Jest config:

   ```js
   "snapshotSerializers": [
     "<rootDir>/node_modules/jest-serializer-vue-tjw"
   ]
   ```

Then just use `.toMatchSnapshot('optional snapshot name');` in your tests:

**Example:**

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

**ALL SETTINGS ARE OPTIONAL**. The defaults are below. If you like them, you don't need to add anything to your Vue config.

In your `vue.config.js` file:

```js
module.exports = {
  pluginOptions: {
    jestSerializer: {
      removeDataTest: true,
      removeDataTestid: true,
      removeDataTestId: true,
      removeDataQa: false,
      removeServerRendered: true,
      removeDataVId: true,
      stringifyObjects: true,
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
removeDataTest       | `true`            | Removes `data-test="whatever"` from your snapshots if true. To also remove these from your production builds, [see here](https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138).
removeDataTestid     | `true`            | Removes `data-testid="whatever"` from your snapshots if true.
removeDataTestId     | `true`            | Removes `data-test-id="whatever"` from your snapshots if true.
removeDataQa         | `false`           | Removes `data-qa="whatever"` from your snapshots if true. `data-qa` is usually used by non-dev QA members. If they change in your snapshot, that indicates it may break someone else's E2E tests. So most using `data-qa` prefer they be left in by default.
removeServerRendered | `true`            | Removes `data-server-rendered="true"` from your snapshots if true.
removeDataVId        | `true`            | Removes `data-v-1234abcd=""` from your snapshots. Important if a 3rd-party component uses scoped styles, to prevent ID changes from breaking your `mount` based tests when updating a dependency.
stringifyObjects     | `true`            | Replaces `title="[object Object]"` with `title="{a:'asdf'}"` in your snapshots, allowing you to see the data in the snapshot.
pretty               | See above example | These options are passed into `pretty` to format the snapshot. To use `pretty`'s defaults pass in `true`. [See all available options here](https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js).
