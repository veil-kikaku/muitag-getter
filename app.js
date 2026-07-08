const GAS_URL =
"https://script.google.com/macros/s/AKfycbxlqdV0P2AyuKDpvWJvurXqbSdCPS4-nT8N3RK1ul6rEeSzhE3BkAL_M2hD2bRsqAKc/exec";

const input=document.getElementById("url");
const button=document.getElementById("send");
const message=document.getElementById("message");

button.onclick=async()=>{

    const url=input.value.trim();

    if(!url){

        message.textContent="URLを入力してください";
        return;

    }

    if(!url.includes("/status/")){

        message.textContent="Xの投稿URLを入力してください";
        return;

    }

    button.disabled=true;

    message.textContent="送信中...";

    try{

        await fetch(GAS_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                url:url
            })

        });

        message.textContent="投稿しました！";

        input.value="";

    }

    catch(e){

        console.error(e);

        message.textContent="送信できませんでした";

    }

    button.disabled=false;

};