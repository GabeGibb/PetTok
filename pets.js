class Post{
    constructor(name, pfp, petpic, description, comments, liked){
        this.name = name;
        this.pfp = pfp;
        this.petpic = petpic;
        this.description = description;
        this.comments = comments;
        this.liked = liked;
        // this.createPost();
    }
    createPost(){

        let post = document.createElement("div");
        post.classList.add("post");

        let profile = post.appendChild(document.createElement('a'));
        profile.href = "profile.html?name=" + this.name;
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
        if (!this.liked){
            interactions.innerHTML = "<i class=\"fa fa-heart-o\" style=\"font-size:30px; padding-left:5px; padding-right:5px; cursor:pointer;\"></i><i class=\"fa fa-comment-o\" style=\"font-size:30px; padding-right:5px; padding-left:5px;\"></i>";
        }else{
            interactions.innerHTML = "<i class=\"fa fa-heart\" style=\"font-size:30px; padding-left:5px; padding-right:5px; cursor:pointer;\"></i><i class=\"fa fa-comment-o\" style=\"font-size:30px; padding-right:5px; padding-left:5px;\"></i>";
        }
        let obj = this
        interactions.childNodes[0].onclick = function(){
            if(!obj.liked){
                interactions.childNodes[0].classList.remove('fa-heart-o');
                interactions.childNodes[0].classList.add('fa-heart');
                obj.liked = true;
                savePosts()
            }
            else{
                interactions.childNodes[0].classList.remove('fa-heart');
                interactions.childNodes[0].classList.add('fa-heart-o');
                obj.liked = false;
                savePosts()
            }
        };

        interactions.childNodes[1].onclick = function(){
            obj.toggleComments(interactions.parentElement);
        }

        let picDiv = (interactions.parentElement.childNodes[1])
        let comments = document.createElement("div");
        comments.classList.add("comments")
        comments.classList.add("hidePic")
        picDiv.appendChild(comments);
        for(let i = 0; i < this.comments.length; i++){
            let comment = comments.appendChild(document.createElement("div"));
            comment.classList.add("comment");
            let commentPFP = comments.appendChild(document.createElement('img'));
            commentPFP.classList.add("commentPFP");
            console.log(comments)
            let commentUser = comment.appendChild(document.createElement('a'));
            commentUser.href = "profile.html?name=" + this.comments[i].name;
            commentUser.classList.add("commentUser");
            commentUser.innerHTML = "@" + this.comments[i].name;
            let commentText = comment.appendChild(document.createElement("p"));
            commentText.classList.add("commentText");
            commentText.innerHTML = this.comments[i].comment;

        }

        // console.log(post.getElementsByClassName("fa-comment-o"))
        // interactions.childNodes[1].onclick=function(){this.showComments()}
        // this.showComments();


        let caption = post.appendChild(document.createElement("div"));
        caption.classList.add("caption");
        let captionUser = caption.appendChild(document.createElement('a'));
        captionUser.href = "profile.html?name=" + this.name;
        captionUser.classList.add("captionUser");
        captionUser.innerHTML = "@" + this.name;
        let captionText = caption.appendChild(document.createElement("p"));
        captionText.classList.add("captionText");
        captionText.innerHTML = this.description;

        document.getElementById('posts').append(post)

        
    }
    toggleComments(post){
        let picDiv = (post.childNodes[1])
        if (!picDiv.childNodes[0].classList.contains('hidePic')){//if pic not hidden show comments
            picDiv.childNodes[0].classList.add("hidePic")
            picDiv.childNodes[1].classList.remove("hidePic")
        }else{ //hide comments
            picDiv.childNodes[1].classList.add("hidePic")
            picDiv.childNodes[0].classList.remove("hidePic")
        }

    }
}

class Pet{
    constructor(petName, posts){
        this.petName = petName;
        this.posts = posts;
        this.pfp = 'pets/' + this.petName + '0.jpg';
        this.images = []
        for (let i = 1; i < this.posts.length + 1; i++){
            this.images.push('pets/' + this.petName + i + '.jpg')
            
        }
        

    }
}

let posts = []

function createPosts(pets){
    // let posts = []
    if (localStorage.getItem('posts')){
        posts = loadPosts()
        for (let i = 0; i < posts.length; i++){
            posts[i] = new Post(posts[i].name, posts[i].pfp, posts[i].petpic, posts[i].description, posts[i].comments, posts[i].liked)
        }
        console.log(posts)
    }else{
        for (let i = 0; i < pets.length; i++){
            for(let j = 0; j < pets[i]['posts'].length; j++){
                posts.push(new Post(pets[i].petName, pets[i].pfp, pets[i].images[j], pets[i].posts[j].description, pets[i].posts[j].comments, false))
            }
        }
        shuffleArray(posts);
        savePosts(posts)

    }
    return posts
    
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



if (localStorage.getItem('pets')){
    let pets = loadPets();
    posts = createPosts(pets)
    showPosts(posts)
}else{
    fetch('pets.json')
    .then((response) => response.json())
    .then((json) => {
        let pets = []
        let localPets = []
        for(let i = 0; i < json.length; i++){
            pets.push(new Pet(json[i]['name'], json[i]['posts']))
            let curPet = {}
            curPet.petName = pets[i].petName;
            curPet.posts = pets[i].posts;
            curPet.pfp = pets[i].pfp;
            curPet.images = pets[i].images;
            // curPet.liked = pets[i].liked;
            localPets.push(curPet)
        }
        savePets(localPets)
        posts = createPosts(pets)
        showPosts(posts)
    })
}


function savePets(pets){
    let petString = JSON.stringify(pets);
    localStorage.setItem('pets', petString)
}

function loadPets(){
    let pets = JSON.parse(localStorage.getItem('pets'))
    return pets
}

function savePosts(){
    let localPosts = []
    console.log(posts)
    for (let i = 0; i < posts.length; i++){
        let curPost = {}
        curPost.name = posts[i].name;
        curPost.pfp = posts[i].pfp;
        curPost.petpic = posts[i].petpic;
        curPost.description = posts[i].description;
        curPost.comments = posts[i].comments;
        curPost.liked = posts[i].liked
        localPosts.push(curPost)
    }
    let postString = JSON.stringify(localPosts);
    localStorage.setItem('posts', postString)
}

function loadPosts(){
    posts = JSON.parse(localStorage.getItem('posts'))
    return posts
}