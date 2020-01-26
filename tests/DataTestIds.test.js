const helpers = require('./helpers.js');

import { shallowMount } from '@vue/test-utils';
import DataTestIds from './components/DataTestIds.vue';

describe('DataTestIds.vue', () => {
  test('Remove data-server-rendered, data-test, data-testid, data-test-id by default', () => {
    helpers.mockSettings({});

    const wrapper = shallowMount(DataTestIds);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-server-rendered removed', () => {
    helpers.mockSettings({
      removeServerRendered: true,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false
    });

    const wrapper = shallowMount(DataTestIds);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-test removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: true,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false
    });

    const wrapper = shallowMount(DataTestIds);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-testid removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: true,
      removeDataTestId: false,
      removeDataQa: false
    });

    const wrapper = shallowMount(DataTestIds);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-test-id removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: true,
      removeDataQa: false
    });

    const wrapper = shallowMount(DataTestIds);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Only data-qa removed', () => {
    helpers.mockSettings({
      removeServerRendered: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: true
    });

    const wrapper = shallowMount(DataTestIds);

    expect(wrapper)
      .toMatchSnapshot();
  });
});
