let btn = document.getElementById("button-random-dog");
let content = document.getElementById("content");
let img = document.createElement("img");
content.appendChild(img);

btn.addEventListener('click', e => {
    img.alt = 'dogo';
    //console.log('test');
    fetch("https://dog.ceo/api/breeds/image/random").then()
        .then((response) => response.json())
        .then((json) => img.src = json.message)
        .catch((e) => console.log(e.message));

});