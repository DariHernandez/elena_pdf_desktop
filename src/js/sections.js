// Detect drop evenets

var holder = document.querySelector(".drop_area")  
text_drop_area = holder.innerHTML
var files = []

function drop_files () {

    holder.ondraenter = () => {
        return false
    };

    holder.ondragover = () => {
        holder.innerHTML = "DROP!"
        holder.classList.add ("active")
        return false
    };

    holder.ondragleave = () => {
        holder.classList.remove ("active")
        holder.innerHTML = text_drop_area
        return false;
    };

    holder.ondrop = (e) => {

        // Add to list path of each file
        for (let f of e.dataTransfer.files) {
            files.push(f.path)
        }

        e.preventDefault();

        // Reestart section
        holder.classList.remove ("active")
        holder.innerHTML = ""

        // Add file to html
        add_file ()

        return false;
    };

};

function add_file () {
    // Add file to html grid files
    holder.classList.add ("files")

    // Generate childs
    text_drop_area = ""
    text_drop_area += '<div class="grid_files">'

    for (file in files) {
        text_drop_area += '<div class="file_document"></div>'
    }
                
    text_drop_area += '</div>'

    // Add childs
    holder.innerHTML = text_drop_area

}

//  Call funtion 
drop_files ()


// Detect drop evenets

// let files = []

// var holder = document.querySelector(".drop_area")
// text_drop_area = holder.innerHTML

// holder.addEventListener("dragover", function () {
//     holder.classList.add ("active")
//     holder.innerHTML = "DROP!"
//     return false
// })


// holder.addEventListener("dragleave", function () {
//     holder.classList.remove ("active")
//     holder.innerHTML = text_drop_area
//     return false
// })

// holder.addEventListener("ondrop", function (e) {
//     ondrop (e)
// })

// function ondrop (e) {
//     e.preventDefault();

//     for (let f of e.dataTransfer.files) {
//         console.log(f.path)
//     }
    
//     return false;
// }