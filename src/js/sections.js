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

    for (file_index in files) {

        // Get name of file
        if (files[file_index].includes('/')) {
            var start = String(files[file_index]).lastIndexOf("/") + 1
        } else if (files[file_index].includes('\\')) {
            var start = String(files[file_index]).lastIndexOf("\\") + 1
        }

        var end = String(files[file_index]).length - 4

        var file_name = String(files[file_index]).substring (start, end)
        
        text_drop_area += '<div class="file_document">'
        text_drop_area += '<p class="quit">x</p>' 
        text_drop_area += `<p class="name_file"> ${file_name} </p>`
        text_drop_area += '</div>'
    }
                
    text_drop_area += '</div>'

    // Add childs
    holder.innerHTML = text_drop_area

}

//  Call funtion 
drop_files ()

