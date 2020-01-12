import { mount, shallowMount } from '@vue/test-utils';
import Parent from './components/Parent.vue';

describe('Parent.vue', () => {
  test('Mount snapshot', () => {
    const wrapper = mount(Parent);

    expect(wrapper.html())
      .toMatchSnapshot();

    expect(wrapper.element)
      .toMatchSnapshot();
  });

  test('Shallow snapshot', () => {
    const wrapper = shallowMount(Parent);

    expect(wrapper.html())
      .toMatchSnapshot();
  });

  test('Properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallowMount(Parent);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Parent);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
