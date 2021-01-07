let dropContainer = document.querySelector("#dropContainer")

dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
    evt.preventDefault()
};

let files = []

dropContainer.ondrop = function(evt) {

    // If you want to use some of the dropped files
    const dT = new DataTransfer();
    dT.items.add(evt.dataTransfer.files[0]);

    // save files
    files.push (dT)

    evt.preventDefault()

    console.log(files)
}