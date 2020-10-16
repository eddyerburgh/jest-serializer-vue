const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import TestTokens from './components/TestTokens.vue';

describe('TestTokens.vue', () => {
  test('Remove data-server-rendered, data-test, data-testid, data-test-id by default', () => {
    helpers.mockSettings({});

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-server-rendered removed', () => {
    helpers.mockSettings({
      removeServerRendered: true,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: false,
      removeClassTest: false,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-test removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: true,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: false,
      removeClassTest: false,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-testid removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: true,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: false,
      removeClassTest: false,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-test-id removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: true,
      removeDataQa: false,
      removeDataCy: false,
      removeClassTest: false,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-qa removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: true,
      removeDataCy: false,
      removeClassTest: false,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-cy removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: true,
      removeClassTest: false,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only id="test" removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: false,
      removeClassTest: false,
      removeIdTest: true
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only class="test" removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataCy: false,
      removeClassTest: true,
      removeIdTest: false
    });

    const wrapper = shallowMount(TestTokens);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
