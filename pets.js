class Pet{
    constructor(petName, posts){
        this.petName = petName;
        this.posts = posts;
        this.pfp = 'pets/' + this.petName + '0.jpg';
        this.images = []
        for (let i = 1; i < this.posts.length + 1; i++){
            this.images.push('pets/' + this.petName + i + '.jpg')
        }
        console.log(this.petName)
        console.log(this.images)
        console.log(this.posts)

    }
}
// let petName = 'shelby'
// let d = ['yee haw!', 'hello brother', 'this son of a bitch', 'idk']

// let shelby = new Pet(petName, d);

let pets = []

fetch('pets.json')
.then((response) => response.json())
.then((json) => {
    for(let i = 0; i < json.length; i++){
        pets.push(new Pet(json[i]['name'], json[i]['posts']))
    }
    createPosts()
})
