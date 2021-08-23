/* VIEW IMAGE */

let viewImageModal = document.querySelector(".view-image-modal");
viewImageModal.onclick = function () {
    this.classList.toggle("visible");
};
let viewImageModalImage = viewImageModal.querySelector("img");
let spansToDisplayImageModals = document.querySelectorAll(".span-to-display-image-modal");
function handleImageModalClick(e) {
    viewImageModalImage.src = this.dataset.url;
    viewImageModal.classList.add("visible");
}
for (let span of spansToDisplayImageModals) {
    span.addEventListener("click", handleImageModalClick);
}

/* DELETE ALBUM */

let deleteAlbumModal = document.querySelector(".delete-album-modal");
let deleteAlbumButton = document.querySelector("h1 > span");
let yesButton = deleteAlbumModal.querySelector("button:first-of-type");
let cancelButton = deleteAlbumModal.querySelector("button:nth-of-type(2)");

deleteAlbumButton.addEventListener("click", showDeleteModal);
function showDeleteModal() {
    deleteAlbumModal.classList.add("visible");
};
cancelButton.onclick = function(){
    deleteAlbumModal.classList.remove("visible");
}
yesButton.onclick = function(){
    let albumid = this.dataset.albumid;
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:5000/albums/${albumid}`, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            deleteAlbumModal.innerHTML = "<p>Album deleted</p>";
            setTimeout(() => window.location = "/", 1000);
        }
        else if(xhr.readyState == 4){
            deleteAlbumModal.innerHTML = "<p>Error, reload page and try again</p>";
        }
    };
    xhr.send(null);
}

/* UPLOADING IMAGE*/

let input = document.querySelector("input");
let button = document.querySelector("form > button");
let error = document.querySelector(".error");
let album = document.querySelector(".album");
button.onclick = function(e){
    e.preventDefault();
    let albumid = this.dataset.albumid;
    let files = input.files;
    let file = files[0];
    if(file == undefined){
        error.classList.add("visible");
        error.innerHTML = "<p>File field is empty</p>";
        return;
    }
    let xhr = new XMLHttpRequest();
    if(!file.type.startsWith("image")){
        error.classList.add("visible");
        error.innerHTML = "<p>Only images</p>";
        return;
    }
    let duplicateTitle = false;
    let pWithTitles = document.querySelectorAll(".contains-image-title");
    for(let pTitle of pWithTitles){
        console.log(pTitle.textContent, "---" ,file.name);
        if(pTitle.textContent == file.name){
            duplicateTitle = true;
            break;
        }
    }
    if(duplicateTitle){
        error.classList.add("visible");
        error.innerHTML = "<p>Image with that title exists</p>";
        return;
    }
    xhr.open("POST", `http://localhost:5000/albums/${albumid}`, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 201){
            let imageObject = JSON.parse(xhr.responseText);
            let div = document.createElement("div");
            div.setAttribute("class", "image-box");
            let i = document.createElement("img");
            i.setAttribute("src", imageObject.src);
            i.setAttribute("alt", "random-image");
            div.appendChild(i);
            let p = document.createElement("p");
            p.setAttribute("class", "contains-image-title");
            p.textContent = imageObject.title;
            div.appendChild(p);
            let spanOuter = document.createElement("span");
            let spanInner = document.createElement("span");
            spanInner.classList.add("material-icons");
            spanInner.setAttribute("data-url", `${i.src}`);
            spanInner.textContent = "visibility";
            spanInner.addEventListener("click", handleImageModalClick);
            spanOuter.appendChild(spanInner);
            div.appendChild(spanOuter);
            album.appendChild(div);
            error.classList.remove("visible");
        }
        else if(xhr.readyState == 4){
            error.classList.add("visible");
            error.innerHTML = "<p>Error try again</p>";
        }
    };
    let formData = new FormData();
    formData.append('image', file, file.name);
    xhr.send(formData);
};
