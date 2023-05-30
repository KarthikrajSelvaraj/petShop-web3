const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedAdopter;

  before(async () => {
    adoption = await Adoption.deployed();
  });

  describe("adopting a pet and retrieving account addresses", async () => {
    before("adopt a pet using accounts[0]", async () => {
      await adoption.adopt(8, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });
    it("can fetch the address of an owner by pet id", async () => {
      const adpoter = await adoption.adoptors(8);

      assert.equal(
        adpoter,
        expectedAdopter,
        "The owner of the aopted pet should be the first account"
      );
      
      it("can fetch the collection of all pet owner addresses", async()=>{
        const adpoters = await adoption.getAdopters();
        assert.equal(adpoters[8], expectedAdopter, "The owner of the adopted pet should be the last account")
      })
    });
  });
});
