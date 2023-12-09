class Pet{
    constructor(petName, descriptions){
        this.petName = petName;
        this.descriptions = descriptions;
        this.images = []
        for (let i = 0; i < this.descriptions.length+1; i++){
            this.images.push('pets/' + this.petName + i)
        }
        // console.log(this.images)
        // console.log(this.descriptions)
        // console.log(this.petName)

    }
}
let petName = 'shelby'
let d = ['yee haw!', 'hello brother', 'this son of a bitch', 'idk']

let shelby = new Pet(petName, d);

let pets = []

fetch('pets.json')
.then((response) => response.json())
.then((json) => {
    for(let i = 0; i < json.length; i++){
        pets.push(new Pet(json[i]['name'], json[i]['descriptions']))
    }
})
