const helpers = require('./helpers.js');

describe('Demo', () => {
  const demo = `
<div>
  <h1 data-test="pageTitle" data-test-id="pageTitle" data-testid="pageTitle">
    The above specific data-attrubutes are removed by default.
  </h1>
  <div>
    <span class="active" data-qa="span" data-v-b3d95ac7="">
      These data-v ID's are removed too by default.
    </span>
    <!---->
    <!-- There's an option you can turn on to remove all HTML comments too -->
    <!-- It's turned off by default, since they usually represent a v-if="false" -->
    <!-- and maybe you want to know about that. If not, set removeComments: true -->
  </div>

  <div data-server-rendered="true">
    <h3 class="inline-block">Default formatting is improved</h3> <span><i class="fa fa-spinner"></i> <span class="sr-only">Loading...</span></span> <a><button type="button" class="primary"><i class="fa fa-plus"></i>
        The formatting here is completely customizable (see API).
    </button></a>
  </div>
</div>
`;

  test('Default formatting', () => {
    helpers.mockSettings({});

    expect(demo.trim())
      .toMatchSnapshot();
  });

  test('Inverted settings', () => {
    helpers.mockSettings({
      formatting: {},
      removeComments: true,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: true,
      removeDataVId: false,
      removeServerRendered: false,
      stringifyObjects: true
    });

    expect(demo.trim())
      .toMatchSnapshot();
  });

  test('v2.0.2 settings', () => {
    helpers.mockSettings({
      formatting: {
        unformatted: ['code', 'pre', 'em', 'strong', 'span'],
        indent_inner_html: true,
        indent_char: ' ',
        indent_size: 2,
        sep: '\n'
      },
      removeClassTest: false,
      removeComments: false,
      removeDataTest: false,
      removeDataTestid: false,
      removeDataTestId: false,
      removeDataQa: false,
      removeDataVId: false,
      removeIdTest: false,
      removeServerRendered: true,
      stringifyObjects: false
    });

    expect(demo.trim())
      .toMatchSnapshot();
  });
});
