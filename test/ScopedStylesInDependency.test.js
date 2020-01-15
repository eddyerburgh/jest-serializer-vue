import { mount } from '@vue/test-utils';
import ScopedStylesInDependency from './components/ScopedStylesInDependency.vue';

describe('ScopedStylesInDependency.vue', () => {
  test('Snapshot unchanged', () => {
    const wrapper = mount(ScopedStylesInDependency);

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
