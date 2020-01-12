import { mount, shallow } from '@vue/test-utils';
import Parent from './components/Parent.vue';

describe('Parent.vue', () => {
  test('mount snapshot', () => {
    const wrapper = mount(Parent);

    expect(wrapper.html())
      .toMatchSnapshot();

    expect(wrapper.element)
      .toMatchSnapshot();
  });

  test('shallow snapshot', () => {
    const wrapper = shallow(Parent);

    expect(wrapper.html())
      .toMatchSnapshot();
  });

  test('properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallow(Parent);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Parent);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
