export default class Strategy {
  constructor({ currentValue, lowestValue, highestValue }) {
    this.currentValue = currentValue;
    this.lowestValue = lowestValue;
    this.highestValue = highestValue;
    this.shouldBuy = false;
    this.shouldSell = false;
    this.armedToBuy = false;
    this.armedToSell = false;
  }

  get buyingPrice() {
    return this.lowestValue * 1.01;
  }

  get sellingPrice() {
    return this.highestValue * 0.99;
  }

  update(newValue) {
    this.currentValue = newValue;
    if (newValue > this.highestValue) {
      this.highestValue = newValue;
    }
    if (newValue < this.lowestValue) {
      this.lowestValue = newValue;
    }

    this.shouldBuy = this.currentValue > this.buyingPrice;
    this.shouldSell = this.currentValue < this.sellingPrice;
  }
}