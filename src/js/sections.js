// Control variables for buttons status
var name_date_active_button = false
var delete_active_button = false

// Get buttons and add events
order_name_buttons = document.querySelectorAll (".order_name")
order_date_buttons = document.querySelectorAll (".order_date")
delete_buttons = document.querySelectorAll (".delete")
file_inputs = document.querySelectorAll (".file_input")

for (let i = 0; i < order_name_buttons.length; i++) {
    order_name_buttons[i].addEventListener ('click', function(){short_files("name")})
    order_date_buttons[i].addEventListener ('click', function(){short_files("date")})
    delete_buttons[i].addEventListener ('click', delete_files)
    file_inputs[i].addEventListener ('change', select_file)
}

// Detect drop evenets
var holder = document.querySelector (".drop_area")  
text_drop_area = "Drop your PDF FILES here or Click"

let files = []

function restart_drop_area () { 
    holder.classList.remove ("active")
    holder.classList.remove ("files")
    holder.innerHTML = text_drop_area
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
        restart_drop_area ()
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

function update_files () {
    // Update buttons
    update_buttons_status ()

    // Add file to html grid files
    holder.classList.add ("files")

    // Generate childs
    text_drop_area_grid = ""
    text_drop_area_grid += '<div class="grid_files">'

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

}

reverse_short = false
function short_files (order_by) {
    
    // Verify buttons status
    if (name_date_active_button == true ) {

        let len = files.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len - 1; i++) {

                condition_sort = false
                if (order_by == "name") {
                    if (files[i].name > files[i + 1].name) {
                        condition_sort = true
                    }
                } else if (order_by == "date") {
                    if (files[i].lastModified > files[i + 1].lastModified) {
                        condition_sort = true
                    }        
                }

                if (condition_sort == true) {
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

            alert (`Files shorted by ${order_by} (reverse)`)

        } else {
            reverse_short = true

            alert (`Files shorted by ${order_by}`)
        }    

        // Update
        update_files ()
    }
}

function delete_files () {
    // Verify button status
    if (delete_active_button == true) {
        if (confirm("Do you want to delete all files?")) {
            files = []
            update_files()
            restart_drop_area ()
        } 
    }
}

function update_buttons_status () {
    // Verify files to update status
    if (files.length > 0) {
        delete_active_button = true
        
        if (files.length > 1) {
            name_date_active_button = true
        } else {
            name_date_active_button = false
        }

    } else {
        delete_active_button = false
        name_date_active_button = false
    }

    // Update class list
    for (let i = 0; i < order_name_buttons.length; i++) {
        if (name_date_active_button == true) {
            order_name_buttons[i].classList.remove ("disabled")
            order_date_buttons[i].classList.remove ("disabled")
        } else {
            order_name_buttons[i].classList.add ("disabled")
            order_date_buttons[i].classList.add ("disabled")
        }

        if (delete_active_button == true) {
            delete_buttons[i].classList.remove ("disabled")
        } else {
            delete_buttons[i].classList.add ("disabled")
        }
    }
}

function select_file (evt) {

    // Get files path and add to list
    for (let i = 0; i < evt.target.files.length; i++) {
        if (evt.target.files[i].path.endsWith(".pdf")) {
            files.push(evt.target.files[i])
        }
    }

    update_files ()
}

//  Call funtion 
drop_files ()

// Initial button status
update_buttons_status()


// Change section 

