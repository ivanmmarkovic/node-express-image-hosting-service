
const btn = document.querySelector("form button");
btn.addEventListener("click", sendPostRequest);

function sendPostRequest(e) {
    e.preventDefault();
    let input = document.querySelector("form input");
    let albums = document.querySelector(".albums");
    let errorElement = document.querySelector(".error");

    if (input.value == "") {
        errorElement.classList.add("visible");
        errorElement.innerText = "Input field is empty";
        return;
    }
    let elementsWithTitle = document.querySelectorAll(".contains-album-title");
    let albumTitleIsNotUnique = true;
    for(let pWithTitle of elementsWithTitle){
        if(pWithTitle.textContent == input.value){
            albumTitleIsNotUnique = false;
        }
    }
    if(!albumTitleIsNotUnique){
        errorElement.classList.add("visible");
        errorElement.innerText = "Album title is not unique";
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/albums", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.status == 201 && xhr.readyState == 4) {
            let album = JSON.parse(xhr.responseText);
            let a = document.createElement("a");
            a.setAttribute("href", `/albums/${album._id}`);
            a.classList.add("album-box");
            let i = document.createElement("img");
            i.setAttribute("src", "images/folder-flower-blue-icon.png");
            i.setAttribute("alt", "image-folder");
            a.appendChild(i);
            let p = document.createElement("p");
            p.setAttribute("class", "contains-album-title");
            p.innerText = `${album.title}`;
            a.appendChild(p);
            albums.appendChild(a);
            errorElement.classList.remove("visible");
            input.value = "";
        }
        else if(xhr.readyState == 4) {
            errorElement.classList.add("visible");
            errorElement.innerText = "Error, try again";
        }
    };
    let o = {
        title: input.value
    }
    xhr.send(JSON.stringify(o));

};