// Detect cick events
order_name_button = document.querySelector ("#order_name")
order_date_button = document.querySelector ("#order_date")
delete_button = document.querySelector ("#delete")
theme_button = document.querySelector ("#theme")

order_name_button.addEventListener ('click', short_files)

// Detect drop evenets
var holder = document.querySelector(".drop_area")  
text_drop_area = holder.innerHTML
var files = []
var files_names = []

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

                holder.classList.remove ("active")
                holder.innerHTML = text_drop_area

                return false
            } else {
                holder.classList.remove ("active")
                holder.innerHTML = text_drop_area
                return false
            }
            
        }

        e.preventDefault();

        // Reestart section
        holder.classList.remove ("active")
        holder.innerHTML = ""

        // Add file to html
        update_files ()

        return false;
    };

};

function update_files () {
    // Add file to html grid files
    holder.classList.add ("files")

    // Generate childs
    text_drop_area = ""
    text_drop_area += '<div class="grid_files">'

    for (file_index in files) {

        // Get name of file
        if (files[file_index].path.includes('/')) {
            var start = String(files[file_index].path).lastIndexOf("/") + 1
        } else if (files[file_index].path.includes('\\')) {
            var start = String(files[file_index].path).lastIndexOf("\\") + 1
        }
        var end = String(files[file_index].path).length - 4
        var file_name = String(files[file_index].path).substring (start, end)

        // Save name
        files_names.push (file_name)
        
        text_drop_area += '<div class="file_document">'
        text_drop_area += '<p class="quit">x</p>' 
        text_drop_area += `<p class="name_file"> ${file_name} </p>`
        text_drop_area += '</div>'
    }
                
    text_drop_area += '</div>'

    // Add childs
    holder.innerHTML = text_drop_area

}

reverse_short = false
function short_files () {

    let len = files.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (files[i].name > files[i + 1].name) {
                let tmp = files[i];
                files[i] = files[i + 1];
                files[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);

    
    // Reverse files
    if (reverse_short == true) {

        let files_reverse = []
        let len = files.length;

        for (let i = len - 1; i >= 0; i--) {
            files_reverse.push (files[i])
        }

        files = files_reverse

        reverse_short = false

        alert ("Files shorted by name (reverse)")

    } else {
        reverse_short = true

        alert ("Files shorted by name")
    }    

    // Update
    update_files ()
}

//  Call funtion 
drop_files ()

