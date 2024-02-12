let rbtn = document.getElementById("button-random-dog");
let bbtn = document.getElementById("button-show-breed");
let sbtn = document.getElementById("button-show-sub-breed");
let abtn = document.getElementById("button-show-all")

let binpt = document.getElementById("input-breed");

let content = document.getElementById("content");

rbtn.addEventListener('click', e => {
    fetch("https://dog.ceo/api/breeds/image/random").then()
        .then(response => response.json())
        .then(json => content.innerHTML = "<img src=\""+json.message+"\" alt=\"dogo\">")
        .catch(e => console.log(e.message));
});

bbtn.addEventListener('click', e => {
    let breed = binpt.value.toLowerCase();
    fetch("https://dog.ceo/api/breed/"+breed+"/images/random")
        .then(response => response.json())
        .then(json => content.innerHTML = json.status === "success" ? "<img src=\"" + json.message + "\" alt=\"dogo\">" :
            "<p>Breed not found!</p>")
        .catch(e => console.log(e.message))
});

sbtn.addEventListener('click', e => {
    let breed = binpt.value.toLowerCase();
    fetch("https://dog.ceo/api/breed/"+breed+"/list")
        .then(response => response.json())
        .then(json => {
            if (json.status === "error"){content.innerHTML = "<p>"+json.message.split("(")[0].trim()+"!</p>"}
            else if (json.message.length === 0) {content.innerHTML = "<p>No sub-breeds found!</p>"}
            else {
                let breeds = json.message;
                let s = "<ol type='1'>";
                for (let i= 0; i<breeds.length; i++) {
                    s += "<li>"+breeds[i]+"</li>"
                }
                s += "</ol>";
                content.innerHTML = s;}
        })
        .catch(e => console.log(e.message))
});

abtn.addEventListener('click', e => {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(json => {
            if (json.status === "error"){content.innerHTML = "<p>"+json.message.split("(")[0].trim()+"!</p>"}
            else {
                let breeds = json.message;
                let s = "<ol type='1'>";
                for (const breed in breeds) {
                    let subBreeds = breeds[breed];
                    s += "<li>"+breed;
                    if(subBreeds.length > 0){
                        s += "<ul class='sublist'>"
                        s += "<li>"+subBreeds.toString()+"</li>";
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