import { shallow } from '@vue/test-utils';
import List from './components/List.vue';

describe('List.vue', () => {
  test('hasn\'t changed snapshot', () => {
    const wrapper = shallow(List, {
      propsData: {
        items: ['one', 'two', 'three']
      }
    });

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
