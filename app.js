const SHEET_NAME = "posts";

const form = document.querySelector("form");
const message = document.getElementById("message");

form.addEventListener("submit", () => {

    message.textContent = "投稿しました！";

    setTimeout(loadPosts, 1000);

});

const GAS_URL =
"https://script.google.com/macros/s/AKfycbxlqdV0P2AyuKDpvWJvurXqbSdCPS4-nT8N3RK1ul6rEeSzhE3BkAL_M2hD2bRsqAKc/exec";

async function loadPosts(){

    const res = await fetch(GAS_URL);

    const posts = await res.json();

    const area = document.getElementById("posts");

    area.innerHTML="";

    posts.reverse();

    for(const post of posts){

        const id = post.url.match(/status\/(\d+)/)[1];

        const div=document.createElement("div");

        area.appendChild(div);

        await twttr.widgets.createTweet(id,div);

    }

}

loadPosts();
