import { mount, shallow } from '@vue/test-utils'
import Parent from './components/Parent.vue'

describe('Parent.vue', () => {
  it('mount snapshot', () => {
    const wrapper = mount(Parent)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('shallow snapshot', () => {
    const wrapper = shallow(Parent)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
