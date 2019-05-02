# jest-serializer-vue

Jest Vue snapshot serializer

## Installation

```
npm install --save-dev jest-serializer-vue
```

## Usage

You need to tell Jest to use the serializer. Add this to your Jest config:

```
"snapshotSerializers": [
  "<rootDir>/node_modules/jest-serializer-vue"
]
```

And your snapshot tests will be pretty printed 💅

```js
import { shallowMount } from '@vue/test-utils'
import Basic from './Basic.vue'

describe('Basic.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Basic)
    expect(wrapper).toMatchSnapshot()
  })
})
```
