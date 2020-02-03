# jest-serializer-vue-tjw

[![Build Status](https://travis-ci.org/tjw-lint/jest-serializer-vue-tjw.svg?branch=master)](https://travis-ci.org/tjw-lint/jest-serializer-vue-tjw) [![Test Coverage](https://img.shields.io/coveralls/github/tjw-lint/jest-serializer-vue-tjw?label=Test%20Coverage&logo=jest)](https://coveralls.io/github/tjw-lint/jest-serializer-vue-tjw) ![Lint Coverage: 100%](https://img.shields.io/badge/Lint%20Coverage-100%25-brightgreen.svg?logo=eslint) ![Code of Conduct: No Ideologies](https://img.shields.io/badge/CoC-No%20Ideologies-blue) ![MIT Licensed](https://img.shields.io/badge/License-MIT-brightgreen)


Jest Vue snapshot serializer


## Why use this over the Edd's (AKA: Features list)?

1. Both versions automatically remove `data-server-rendered="true"`.
1. This version automatically removes `data-test="whatever"` from your snapshots (also `data-testid` and `data-test-id`).
1. This version can optionally remove `data-qa="whatever"` from your snapshots (disabled by default, see API for reasoning).
1. This version automatically removes `data-v-1234abcd=""` from snapshots.
1. This version can optionally remove all html comments `<!-- whatever -->` from your snapshots.
1. This version can optionally remove `id="testWhatever"` from your snapshots.
1. This version can optionally remove `class="test-token"` from your snapshots.
1. This version has an experimental feature to display JSON data stored in HTML attributes instead of `href="[object Object]"`
1. This version has much better snapshot defaults.
1. This version lets you control your snapshot formatting with an API.
1. Edd is busy and not maintaining his Vue repos right now. Cool dude though :sunglasses:.


## What do you mean by "much better snapshot defaults"?

This is the before and after of using the default formatting options, and my options (which you can change with the API below, something Edd's version does not offer).

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
      // All available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
      formatting: {
        indent_char: ' ',
        indent_inner_html: true,
        indent_size: 2,
        inline: [],
        sep: '\n',
        unformatted: ['code', 'pre']
      },
      removeClassTest: false,
      removeComments: false,
      removeDataTest: true,
      removeDataTestid: true,
      removeDataTestId: true,
      removeDataQa: false,
      removeDataVId: true,
      removeIdTest: false,
      removeServerRendered: true,
      stringifyObjects: false
    }
  }
};
```

Setting              | Default           | Description
:--                  | :--               | :--
formatting           | See above example | These options format the snapshot. [See all available options here](https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js).
removeClassTest      | `false`           | Removes all CSS classes that start with "test", `class="test-whatever"`. **Warning:** Don't use this approach. Use `data-test` instead. It is better suited for this because it doesn't conflate CSS and test tokens.
removeComments       | `false`           | Removes all HTML comments from your snapshots. This is false be default, as sometimes these comments can infer important information about how your DOM was rendered. However, this is mostly just personal preference.
removeDataTest       | `true`            | Removes `data-test="whatever"` from your snapshots if true. To also remove these from your production builds, [see here](https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138).
removeDataTestid     | `true`            | Removes `data-testid="whatever"` from your snapshots if true.
removeDataTestId     | `true`            | Removes `data-test-id="whatever"` from your snapshots if true.
removeDataQa         | `false`           | Removes `data-qa="whatever"` from your snapshots if true. `data-qa` is usually used by non-dev QA members. If they change in your snapshot, that indicates it may break someone else's E2E tests. So most using `data-qa` prefer they be left in by default.
removeDataVId        | `true`            | Removes `data-v-1234abcd=""` from your snapshots. Important if a 3rd-party component uses scoped styles, to prevent ID changes from breaking your `mount` based tests when updating a dependency.
removeIdTest         | `false`           | Removes `id="test-whatever"` or `id="testWhatever"`from snapshots. **Warning:** You should never use ID's for test tokens, as they can also be used by JS and CSS, making them more brittle. Use `data-test-id` instead.
removeServerRendered | `true`            | Removes `data-server-rendered="true"` from your snapshots if true.
stringifyObjects     | `false`           | **EXPERIMENTAL** Replaces `title="[object Object]"` with `title="{a:'asdf'}"` in your snapshots, allowing you to see the data in the snapshot. Requires you to pass in `wrapper`, not `wrapper.html()`. This is still a work in progress. On deeply nested componets, it may exceed callstack.


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

1. General formatting will be improved to aid in readability and better diffs.
1. Test tokens will be removed. These are used to target elements in your tests.
   * `data-test="whatever"`
   * `data-testid="whatever" `
   * `data-test-id="whatever"`
1. All `data-v-whatever=""` will be removed. These are attributes added by Vue to help scope styles. Removing them from your snapshots makes updating scoped dependencies easier.

**Example:** These are the kind of diffs you can expect to see when migrating from v2 to v3.

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

   <div>
-    <h3 class="inline-block">Default formatting is improved</h3> <span><i class="fa fa-spinner"></i> <span class="sr-only">Loading...</span></span> <a><button type="button class="primary"><i class="fa fa-plus"></i>
+    <h3 class="inline-block">Default formatting is improved</h3>
+    <span>
+      <i class="fa fa-spinner"></i>
+      <span class="sr-only">Loading...</span>
+    </span>
+    <a>
+      <button type="button class="primary">
+        <i class="fa fa-plus"></i>
         The formatting here is completely customizable (see API).
-    </button></a>
+      </button>
+    </a>
   </div>
 </div>
```


### Avoiding breaking changes (not recommended)

Though all default settings are designed to be the best choice for most people, if you want to opt out of these (or opt-in to other changes, like removing HTML comments from snapshots) you can via a settings object in your Vue config.

1. Edit your `vue.config.js` in the root of your project (or create it, if you do not have one).
1. The following are the `jest-serializer-vue` v2.0.2 settings:

```js
module.exports = {
  pluginOptions: {
    jestSerializer: {
      // All available options: https://github.com/beautify-web/js-beautify/blob/master/js/src/html/options.js
      formatting: {
        unformatted: ['code', 'pre', 'em', 'strong', 'span'],
        indent_inner_html: true,
        indent_char: ' ',
        indent_size: 2,
        sep: '\n'
      },
      removeClassTest: false,
      removeComments: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataVId: false,
      removeIdTest: false,
      removeServerRendered: true,
      stringifyObjects: false
    }
  }
};
```


## FAQs & tips

**What is the best approach for targeting elements in a test?** - Use `data-test` when targeting multiple elements, or `data-test-id` (or `data-testid` if you don't like the extra hyphen) when targeting a unique element.

```js
test('Click link', () => {
  const wrapper = shallowMount(LinkList);
  const linkList = wrapper.find('[data-test-id="linkList"]');
  const domLink = linkList.findAll('[data-test="link"]').at(0);

  domLink.trigger('click');

  expect(specialFunction)
    .toHaveBeenCalledWith('https://passed-in-url.com');
});

```

**I have some code that I don't want formatted. How do I "opt out" of the settings for one test?** - You can skip the snapshots and just do a string comparison directly, without a snapshot. This is useful when the actual whitespace in the DOM is important and needs to be captured properly without formatting being applied.

```js
test('Spacing around links is accurate', () => {
  const wrapper = shallowMount(YourComponent);
  const section = wrapper.find('[data-test-id="specificSection"]');

  expect(section.html())
    .toEqual(`<div data-test-id="specificSection">
  <a href="#">link</a><a href="#">link</a>     <a href="#">link</a>
  <a href="#">link</a>  <a href="#">link</a>
</div>`);
});
```

**How do I override the settings for just one test?** - This is a little complicated, but doable. The following is a basic example. You can refer to the test setup/helpers file in this repo for a more complex example.

```js
describe('YourComponent.vue', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Overriding snapshot settings for one test', () => {
    jest.doMock('../../../vue.config.js', function () {
      return {
        pluginOptions: {
          jestSerializer: {
            removeComments: true,
            stringifyObjects: true
          }
        }
      };
    });

    const wrapper = shallowMount(YourComponent);
    const section = wrapper.find('[data-test-id="specificSection"]');

    expect(section)
      .toMatchSnapshot();
  })
});
```

**How do I opt out of stringifyObjects for one test?** - This is actually much easier. Stringify objects can only be done on a Vue VNode. So if you do `.html()` prior to sending it, it will always skip the `stringifyObjects` code. This allows you to use this experimental feature more easily, while opting out of the more troublesome tests.

```js
test('Assuming stringifyObjects is enabled', () => {
  const wrapper = shallowMount(YourComponent);

  expect(wrapper)
    .toMatchSnapshot('Stringify objects');

  expect(wrapper.html())
    .toMatchSnapshot('Opt out of stringify objects');
});
```
