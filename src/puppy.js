allPups = [];

class Puppy {
  constructor(puppyObj){
    this.id = puppyObj.id,
    this.name = puppyObj.name,
    this.isGoodDog = puppyObj.isGoodDog,
    this.image = puppyObj.image
    allPups.push(this)
  }

  render() {
    return `<span id="puppyName" data-id="${this.id}">${this.name}</span>`
  }

  renderProfile() {

    return `<img src=${this.image}>
              <h2>${this.name}</h2>
              <button class="toggle" data-id="${this.id}">${this.goodOrBad()}</button>`
  }

  goodOrBad() {
    if(this.isGoodDog === true) {
      return `Is Good Dog!`
    }
    else {
    return 'Is Bad Dog!'
    }
  }

  toggle() {
    if(this.isGoodDog) {
      this.isGoodDog = false
    } else {
      this.isGoodDog = true
    }
  }
