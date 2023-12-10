const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


function showPosts(posts){
    posts.forEach((post) => {
        if(post.name == urlParams.get('name')){
            post.createPost()
        }
        
    });
}
