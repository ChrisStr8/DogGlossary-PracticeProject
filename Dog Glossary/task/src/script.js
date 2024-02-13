let rbtn = document.getElementById("button-random-dog");
let bbtn = document.getElementById("button-show-breed");
let sbtn = document.getElementById("button-show-sub-breed");
let abtn = document.getElementById("button-show-all")

let inpt = document.getElementById("input-breed");

let content = document.getElementById("content");

rbtn.addEventListener('click', e => {
    fetch("https://dog.ceo/api/breeds/image/random").then()
        .then(response => response.json())
        .then(json => {
            let breed = json.message.split("/")[4].trim()
            content.innerHTML = "<img src='"+json.message+"' alt='"+breed+"' id='"+breed+"'>"})
        .catch(e => console.log(e.message));
});

bbtn.addEventListener('click', e => {
    let breed = inpt.value.toLowerCase();
    if (breed.length>0){
        let url = "https://dog.ceo/api/breed/"
        let subB = breed.split('-');
        for (let i = 0; i < subB.length; i++) {
            url += subB[i]+'/';
        }
        url += "images/random";
        fetch(url)
            .then(response => response.json())
            .then(json => content.innerHTML = json.status === "success" ? "<img src='" + json.message + "' alt='"+breed+"' id='"+breed+"'>" :
                "<p>Breed not found!</p>")
            .catch(e => console.log(e.message))
    }
    else content.innerHTML = "<p>Breed Input is Empty</p>";
});

sbtn.addEventListener('click', e => {
    let breed = inpt.value.toLowerCase();
    if (breed.length>0){
        fetch("https://dog.ceo/api/breed/"+breed.split('-')[0]+"/list")
            .then(response => response.json())
            .then(json => {
                if (json.status === "error"){content.innerHTML = "<p>"+json.message.split("(")[0].trim()+"!</p>"}
                else if (json.message.length === 0) {content.innerHTML = "<p>No sub-breeds found!</p>"}
                else {
                    breed = breed.split('-')[0];
                    inpt.value = breed;
                    let breeds = json.message;
                    let s = "<ol class='breeds' type='1'>";
                    for (let i= 0; i<breeds.length; i++) {
                        s += "<li id='"+breed+"-"+breeds[i]+"'>"+breeds[i]+"</li>"
                    }
                    s += "</ol>";
                    content.innerHTML = s;}
            })
            .catch(e => console.log(e.message))
    }
    else content.innerHTML = "<p>Breed Input is Empty</p>";
});

abtn.addEventListener('click', e => {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(json => {
            if (json.status === "error"){content.innerHTML = "<p>"+json.message.split("(")[0].trim()+"!</p>"}
            else {
                let breeds = json.message;
                let s = "<ol class='breeds' type='1'>";
                for (const breed in breeds) {
                    let subBreeds = breeds[breed];
                    s += "<li id='"+breed+"'>"+breed;
                    if(subBreeds.length > 0){
                        s += "<ul>"
                        s += "<li class='sub-breeds' id='"+breed+"'>"+subBreeds.toString()+"</li>";
                        /*for (let i= 0; i<subBreeds.length; i++) {
                            s += "<li>"+subBreeds[i]+"</li>"
                        }*/
                        s += "</ul>"
                    }
                    s += "</li>";
                }
                s += "</ol>";
                content.innerHTML = s;}
        })
        .catch(e => {console.log(e.message); console.log("test");})
});

content.addEventListener('click', e => {
    //console.log(e.target.id);
    //console.log(e.target);
    inpt.value = e.target.id;
})