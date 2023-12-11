const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


function showPosts(posts){
    let i = 0;

    posts.forEach((post) => {
        if(post.name == urlParams.get('name')){
            post.createPost()
            loadPfp(posts[i]) //loads pfp multiple times not great but whatever
        }
        i++;
        
    });
}

function loadPfp(post){
    // console.log(post)
    let pfp = document.getElementById("pfp");
    pfp.src = post.pfp;
}

