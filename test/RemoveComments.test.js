describe('RemoveComments', () => {
  test('Snapshot is unchanged', () => {
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

    expect(commented.trim())
      .toMatchSnapshot();
  });
});
