class Post{
    constructor(name, pfp, petpic, description){
        this.name = name;
        this.pfp = pfp;
        this.petpic = petpic;
        this.description = description;
        // this.createPost();
    }

    createPost(){

        let post = document.createElement("div");
        post.classList.add("post");

        let profile = post.appendChild(document.createElement('div'));
        profile.classList.add("profile");
        let pfp = profile.appendChild(document.createElement("img"));
        pfp.classList.add('pfp');
        pfp.src = this.pfp;
        let name = profile.appendChild(document.createElement("p"));
        name.classList.add('name')
        name.innerHTML = this.name;

        let pic = post.appendChild(document.createElement("div"));
        pic.classList.add("pic");
        let petpic = pic.appendChild(document.createElement("img"));
        petpic.classList.add("petpic");
        petpic.src = this.petpic;

        let interactions = post.appendChild(document.createElement("interactions"));
        interactions.classList.add("interactions");
        interactions.innerHTML = "<i class=\"fa fa-heart-o\" style=\"font-size:30px; padding-left:5px; padding-right:5px; cursor:pointer;\"></i><i class=\"fa fa-comment-o\" style=\"font-size:30px; padding-right:5px; padding-left:5px;\"></i>";
        // let obj = this
        interactions.childNodes[0].onclick = function(){
            if(interactions.childNodes[0].classList.contains('fa-heart-o')){
            interactions.childNodes[0].classList.remove('fa-heart-o');
            interactions.childNodes[0].classList.add('fa-heart');
            }
            else{
                interactions.childNodes[0].classList.remove('fa-heart');
                interactions.childNodes[0].classList.add('fa-heart-o');
            }
        };

        let caption = post.appendChild(document.createElement("div"));
        caption.classList.add("caption");
        let captionText = caption.appendChild(document.createElement("p"));
        captionText.classList.add("captionText");
        captionText.innerHTML = this.description;

        document.body.append(post)
    }

    likePost(){ 
        console.log(this)
    }
}

// function likePost(){
//     alert("hai");
//     console.log("a")
// }

// dexter0 = new Post("Dexter", 'pets/dexter0.jpg', 'pets/dexter0.jpg', "dexter")
// ollie0 = new Post("Ollie", "pets/ollie0.jpg", "pets/ollie0.jpg", "bork")

let posts = []

function createPosts(){
    for (let i = 0; i < pets.length; i++){
        for(let j = 0; j < pets[i]['posts'].length; j++){
            posts.push(new Post(pets[i].petName, pets[i].pfp, pets[i].images[j], pets[i].posts[j].description))
        }
    }
    shuffleArray(posts);
    posts.forEach((post) => post.createPost());
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
