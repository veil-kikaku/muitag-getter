const API_URL="https://muimani-post-api.neetland.workers.dev";

const input=document.getElementById("url");
const button=document.getElementById("send");
const message=document.getElementById("message");
const posts=document.getElementById("posts");

button.onclick=async()=>{

    const url=input.value.trim();

    if(!url){

        message.textContent="URLを入力してください";
        return;

    }

    if(!url.match(/^https:\/\/(x|twitter)\.com\/.+\/status\/\d+/)){

        message.textContent="Xの投稿URLを入力してください";
        return;

    }

    button.disabled=true;

    const res=await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            url:url
        })

    });

    const result=await res.json();

    if(result.success){

        message.textContent="投稿しました！";

        input.value="";

        loadPosts();

    }else{

        message.textContent="この投稿は既に登録されています";

    }

    button.disabled=false;

};

async function loadPosts(){

    posts.innerHTML="読み込み中...";

    const res=await fetch(API_URL);

    const data=await res.json();

    document.getElementById("count").textContent=data.length;

    posts.innerHTML="";

    for(const post of data){

        const id=post.url.match(/status\/(\d+)/)[1];

        const div=document.createElement("div");

        div.className="tweet";

        posts.appendChild(div);

        await twttr.widgets.createTweet(id,div);

    }

}

loadPosts();