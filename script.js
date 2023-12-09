class Post{
    constructor(name, pfp, petpic, description){
        this.name = name;
        this.pfp = pfp;
        this.petpic = petpic;
        this.description = description;
        this.createPost();
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
        interactions.innerHTML = "<i class=\"fa fa-heart-o\" style=\"font-size:40px; padding-right:5px;\"></i><i class=\"fa fa-comment-o\" style=\"font-size:40px; padding-left:5px;\"></i>";
        
        let caption = post.appendChild(document.createElement("div"));
        caption.classList.add("caption");
        let captionText = caption.appendChild(document.createElement("p"));
        captionText.classList.add("captionText");
        captionText.innerHTML = this.description;

        document.body.append(post)
    }

}


// dexter0 = new Post("Dexter", 'pets/dexter0.jpg', 'pets/dexter0.jpg', "dexter")
// ollie0 = new Post("Ollie", "pets/ollie0.jpg", "pets/ollie0.jpg", "bork")
function createPosts(){
    for (let i = 0; i < pets.length; i++){
        new Post(pets[i].petName, pets[i].pfp, pets[i].images[0], pets[i].posts[0].description)
    }
    
}
