const API_URL = "https://muimani-post-api.neetland.workers.dev";

const adminKeyInput = document.getElementById("adminKey");

const posts = document.getElementById("posts");

const count = document.getElementById("count");

document
.getElementById("reload")
.onclick = loadPosts;

async function loadPosts(){

    posts.innerHTML="読み込み中...";

    const res = await fetch(API_URL);

    const data = await res.json();

    count.textContent = data.length;

    posts.innerHTML="";

    data.forEach(post=>{

        const div=document.createElement("div");

        div.className="card";

div.innerHTML=`

<h3>ID ${post.id}</h3>

<div id="tweet-${post.id}"></div>

<p>
${post.url}
</p>

<p>
${post.created_at}
</p>

<button onclick="deletePost(${post.id})">
削除
</button>

<hr>

`;

        posts.appendChild(div);
        
        const id = post.url.match(/status\/(\d+)/)[1];

        await twttr.widgets.createTweet(
            id,
            document.getElementById(`tweet-${post.id}`)
        );

    });

}

async function deletePost(id){

    if(!confirm("削除しますか？")){
        return;
    }


    const key = adminKeyInput.value;


    if(!key){

        alert("管理キーを入力してください");

        return;

    }


    const res = await fetch(

        API_URL+"?id="+id,

        {

            method:"DELETE",

            headers:{

                "X-Admin-Key":key

            }

        }

    );


    const result=await res.json();


    if(result.success){

        loadPosts();

    }else{

        alert("削除できません");

    }

}

loadPosts();
