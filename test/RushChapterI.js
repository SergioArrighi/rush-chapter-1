const RushChapterI = artifacts.require("RushChapterI");
const expect = require('chai').expect;
const utils = require("./helpers/utils");

contract("RushChapterI", (accounts) => {
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await RushChapterI.new();
    });
    it("should recharge the maching with dishes", async() => {
      const {0: currentQuantity, 1: addedQuantity } = 
        await contractInstance.fillDish.call(0,1);
      expect(currentQuantity.toNumber()).to.be.equal(1);
      expect(currentQuantity.toNumber()).to.be.equal(1);
    });
    it("should recharge to max quantity if excedeed", async() => {
      const { 0: currentQuantity, 1: addedQuantity } = 
        await contractInstance.fillDish.call(0, 43);
      expect(currentQuantity.toNumber()).to.be.equal(42);
      expect(addedQuantity.toNumber()).to.be.equal(42);
    });
    it("should recharge to max quantity if excedeed with mixed dishes", async() => {
      await contractInstance.fillDish(0, 38);
      const { 0: currentQuantity, 1: addedQuantity } = await contractInstance.fillDish.call(0, 5);
      expect(currentQuantity.toNumber()).to.be.equal(42);
      expect(addedQuantity.toNumber()).to.be.equal(4);
    });
    it("should not return dish if quantity is zero", async () => {
      await utils.shouldThrow(contractInstance.getDish(0, 1));
      await utils.shouldThrow(contractInstance.getDish(1, 1));
      await utils.shouldThrow(contractInstance.getDish(2, 1));
      await utils.shouldThrow(contractInstance.getDish(3, 1));
      await utils.shouldThrow(contractInstance.getDish(4, 1));
    });
    it("should return dishes for the given quantity", async() => {
      await contractInstance.fillDish(0, 8);
      const { 0: dish, 1: dishQuantity, 2: remainingDishQuantity } =
        await contractInstance.getDish.call(0, 2);
      expect(dish.toNumber()).to.be.equal(0);
      expect(dishQuantity.toNumber()).to.be.equal(2);
      expect(remainingDishQuantity.toNumber()).to.be.equal(6);
    })
})