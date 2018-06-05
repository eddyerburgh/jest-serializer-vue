import { mount, shallow } from '@vue/test-utils'
import Empty from './components/Empty.vue'

describe('Empty.vue', () => {
  it('mount snapshot', () => {
    const wrapper = mount(Empty)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('shallow snapshot', () => {
    const wrapper = shallow(Empty)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('properly serializes a shallowly-rendered wrapper', () => {
    const wrapper = shallow(Empty)
    expect(wrapper).toMatchSnapshot()
  })

  it('properly serializes a fully-mounted wrapper', () => {
    const wrapper = mount(Empty)
    expect(wrapper).toMatchSnapshot()
  })
})
