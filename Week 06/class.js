class Human {
    constructor() {
        this.life = 100 
    }
    hurt(damage) {
        this.life -= damage
    }
}

class Dog {
    constructor() {
        this.damage = 10
    }
    bite() {
        return this.damage
    }
}

let dog = new Dog()
let human = new Human()
human.hurt(dog.bite())
