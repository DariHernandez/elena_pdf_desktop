function restart_drop_area () { 
    if (current_section != "home") {
        holder.classList.remove ("active")
        holder.classList.remove ("files")
        holder.innerHTML = text_drop_area
    }
}

function update_files () {
    // Update buttons
    update_buttons_status ()

    // Add file to html grid files
    holder.classList.add ("files")

    // Generate childs
    text_drop_area_grid = ""
    text_drop_area_grid += '<div class="grid_files">'

    if (files.length > 0) {
        for (file_index in files) {

            // Get name of file
            if (files[file_index].path.includes('/')) {
                var start = String(files[file_index].path).lastIndexOf("/") + 1
            } else if (files[file_index].path.includes('\\')) {
                var start = String(files[file_index].path).lastIndexOf("\\") + 1
            }
            var end = String(files[file_index].path).length - 4
            var file_name = String(files[file_index].path).substring (start, end)
    
            
            text_drop_area_grid += '<div class="file_document">'
            text_drop_area_grid += '<p class="quit">x</p>' 
            text_drop_area_grid += `<p class="name_file"> ${file_name} </p>`
            text_drop_area_grid += '</div>'
        }
                    
        text_drop_area_grid += '</div>'
    
        // Add childs
        holder.innerHTML = text_drop_area_grid
    } else {
        restart_drop_area ()
    }

}

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
        update_files()
        return false;
    };

    holder.ondrop = (e) => {

        // Add to list path of each file
        for (let f of e.dataTransfer.files) {

            // Verify extension of files
            if (f.path.endsWith(".pdf")) {
                files.push(f)
            } else if (f.path.includes (".")) {
                let start = f.path.lastIndexOf ('.')
                let end = f.path.length
                let file_extension = String (f.path).substr (start, end).toUpperCase()

                alert (`INCORRECT FILE EXTENSION\
                \nThis section doesn\'t support this type ( ${file_extension} ). \
                \nTry with other document.`)

                restart_drop_area ()

                return false
            } else {
                
                restart_drop_area()
                return false
            }
            
        }

        e.preventDefault();

        // Reestart section
        restart_drop_area ()
        holder.innerHTML = ""

        // Add file to html
        update_files ()

        return false;
    };

};

function select_file (evt) {

    // Get files path and add to list
    for (let i = 0; i < evt.target.files.length; i++) {
        if (evt.target.files[i].path.endsWith(".pdf")) {
            files.push(evt.target.files[i])
        }
    }

    update_files ()
}

