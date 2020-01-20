# jest-serializer-vue-tjw

[![Build Status](https://travis-ci.org/tjw-lint/jest-serializer-vue-tjw.svg?branch=master)](https://travis-ci.org/tjw-lint/jest-serializer-vue-tjw) ![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen) ![Code of Conduct: No Ideologies](https://img.shields.io/badge/CoC-No%20Ideologies-blue)

Jest Vue snapshot serializer


## Why use this over the Edd's (AKA: Features list)?

1. Both versions automatically remove `data-server-rendered="true"`.
1. This version automatically removes `data-test="whatever"` from your snapshots (also `data-testid` and `data-test-id`).
1. This version can optionally remove `data-qa="whatever"` from your snapshots (disabled by default, see API for reasoning).
1. This version automatically removes `data-v-1234abcd=""` from snapshots.
1. This version can optionally remove all html comments `<!-- whatever -->` from your snapshots.
1. This version has an experimental feature to display JSON data stored in HTML attributes instead of `href="[object Object]"`
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
      removeComments: false,
      removeDataTest: true,
      removeDataTestid: true,
      removeDataTestId: true,
      removeDataQa: false,
      removeServerRendered: true,
      removeDataVId: true,
      stringifyObjects: false,
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
removeComments       | `false`           | Removes all HTML comments from your snapshots. This is false be default, as sometimes these comments can infer important information about how your DOM was rendered. However, this is mostly just personal preference.
removeDataTest       | `true`            | Removes `data-test="whatever"` from your snapshots if true. To also remove these from your production builds, [see here](https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138).
removeDataTestid     | `true`            | Removes `data-testid="whatever"` from your snapshots if true.
removeDataTestId     | `true`            | Removes `data-test-id="whatever"` from your snapshots if true.
removeDataQa         | `false`           | Removes `data-qa="whatever"` from your snapshots if true. `data-qa` is usually used by non-dev QA members. If they change in your snapshot, that indicates it may break someone else's E2E tests. So most using `data-qa` prefer they be left in by default.
removeServerRendered | `true`            | Removes `data-server-rendered="true"` from your snapshots if true.
removeDataVId        | `true`            | Removes `data-v-1234abcd=""` from your snapshots. Important if a 3rd-party component uses scoped styles, to prevent ID changes from breaking your `mount` based tests when updating a dependency.
stringifyObjects     | `false`           | **EXPERIMENTAL** Replaces `title="[object Object]"` with `title="{a:'asdf'}"` in your snapshots, allowing you to see the data in the snapshot. Requires you to pass in `wrapper`, not `wrapper.html()`. This is still a work in progress. On deeply nested componets, it may exceed callstack.
pretty               | See above example | These options are passed into `pretty` to format the snapshot. To use `pretty`'s defaults pass in `true`. [See all available options here](https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js).


## Migrating from v2 to v3

1. First you will need to install this new dependency:
   * `npm install --save-dev jest-serializer-vue-tjw`
   * If you have `jest-serializer-vue` in your dependencies or devDependencies it can be removed.
1. Next you will need to change your Jest config settings. Make sure to replace the reference to the previous (non-TJW) version with the new version:
   ```js
   "snapshotSerializers": [
     "<rootDir>/node_modules/jest-serializer-vue-tjw"
   ]
   ```
1. Run your test command with `-- -u` at the end so it will update your snapshots, for example:
   * `npm run test:unit -- -u`


### Breaking changes to expect in your snapshots during migration

1. Test tokens will be removed. These are used to target elements in your tests.
   * `data-test="whatever"`
   * `data-testid="whatever" `
   * `data-test-id="whatever"`
1. All `data-v-whatever=""` will be removed. These are attributes added by Vue to help scope styles. Removing them from your snapshots makes updating scoped dependencies easier.

```diff
 <div>
-  <h1 data-test="pageTitle" data-test-id="pageTitle" data-testid="pageTitle">
+  <h1>
     The above specific data-attrubutes are removed by default.
   </h1>
   <div>
-    <span class="active" data-v-b3d95ac7="">
+    <span class="active">
       These data-v ID's are removed too by default.
     </span>
     <!---->
     <!-- There's an option you can turn on to remove all HTML comments too -->
     <!-- It's turned off by default, since they usually represent a v-if="false" -->
     <!-- and maybe you want to know about that. If not, set removeComments: true -->
   </div>
 </div>
```


### Avoiding breaking changes

Though all default settings are designed to be the best choice for most people, if you want to opt out of these (or opt-in to other changes, like removing HTML comments from snapshots) you can via a settings object in your Vue config.

1. Edit your `vue.config.js` in the root of your project (or create it, if you do not have one).
  * See the **API** section in these docs for details about customizing your preferences.
