import { mount, shallow } from '@vue/test-utils';
import Empty from './components/Empty.vue';

describe('Empty.vue', () => {
  test('properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallow(Empty);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Empty);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
