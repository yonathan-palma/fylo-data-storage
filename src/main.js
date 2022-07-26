"use strict";

const archivo = document.getElementById("file");
archivo.addEventListener("change", (e)=>{

    let size = returnFileSize(archivo.files[0].size);
    const div = document.createElement("div");
    div.classList.add("container_progress");
    document.body.appendChild(div);
    loadArchivo(archivo.files[0]);
    // console.log(size);
})

const loadArchivo = (ar) =>{
    
    const reader = new FileReader();
    const divProgress = document.querySelector(".container_progress");
    reader.readAsDataURL(ar);
    const tittle = ar.name;
    let h3 = document.createElement("h3");
    h3.textContent = tittle;

    const div_bar = document.createElement("div");
    const div_progress = document.createElement("div");
    div_bar.classList.add("progressBar");
    div_progress.classList.add("progressLoad");
    div_bar.append(div_progress);

    divProgress.append(h3,div_bar);
    reader.addEventListener("progress", (e)=>{
        let carga = (e.loaded / ar.size) * 100;
        div_progress.style.width = `${carga}%`
    });
    reader.addEventListener("load", (e)=>{
            // console.log(reader);
            // console.log(e.currentTarget);
      divProgress.style.opacity = 0;
      setTimeout(() => {
        divProgress.remove();
      }, 1500);
    })
    
}

function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }