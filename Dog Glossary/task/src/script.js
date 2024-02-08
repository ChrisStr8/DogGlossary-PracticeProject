let rbtn = document.getElementById("button-random-dog");
let bbtn = document.getElementById("button-show-breed");

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

