const helpers = require('../helpers.js');

describe('RemoveComments', () => {
  const commented = `
<div>
  <span>3</span>
  <!---->
  <div>
    <!---->
    <span>2</span><!-- <div></div> -->
   <!--
     <div>
    </div>
   -->
    <div>
      <span>1</span>
      <!---->
      <!---->
    </div>
    <div>
      <div>
        <!--
        asdf asdf
       asdf
      -->
        <span>1</span>
        <!---->
        <!-- as as9-df df -->
        <!---->
        <!--asdf-->
        <!----><!---->
      </div>
    </div>
  </div>
  <div></div>
</div>
<!---->
`;

  test('Comments removed', () => {
    helpers.mockSettings({
      removeComments: true
    });

    expect(commented.trim())
      .toMatchSnapshot();
  });

  test('Comments remain', () => {
    helpers.mockSettings({
      removeComments: false
    });

    expect(commented.trim())
      .toMatchSnapshot();
  });
});
