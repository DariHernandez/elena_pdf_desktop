// Get buttons and add events
order_name_buttons = document.querySelectorAll (".order_name")
order_date_buttons = document.querySelectorAll (".order_date")
delete_buttons = document.querySelectorAll (".delete")
file_inputs = document.querySelectorAll (".file_input")

function update_buttons_status () {
    update_right_buttons()
    update_main_buttons()
}

function update_right_buttons () {
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

    // Update class list for section button
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

function update_main_buttons () {

    let main_button = document.querySelector (".section.active div.button_main")
    
    // Set a min number of files to active the button
    let min_number_files = 1
    if (current_section == "merge") {
        min_number_files = 2
    } 

    
    // Show or hide main button
    if (current_section != "home") {
        if (files.length >= min_number_files) {
            main_button.classList.remove ("disabled")
        } else {
            main_button.classList.add ("disabled")
        }
    }
    
}

// Add events to sections buttons
for (let i = 0; i < order_name_buttons.length; i++) {
    order_name_buttons[i].addEventListener ('click', function(){short_files("name")})
    order_date_buttons[i].addEventListener ('click', function(){short_files("date")})
    delete_buttons[i].addEventListener ('click', delete_files)
    file_inputs[i].addEventListener ('change', select_file)
}


function short_files (order_by) {

    // Verify buttons status
    if (name_date_active_button == true ) {

        // Order files
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

        
        // Update sort control var
        let reverse_short = false
        if (order_by == "name") {
            reverse_short = reverse_short_name
            reverse_short_name = !reverse_short_name

        } else if (order_by == "date") {
            reverse_short = reverse_short_date
            reverse_short_date = !reverse_short_date
        }


        // / Order files reverse
        if (reverse_short == true) {
            console.log ("reverse true")

            let files_reverse = []
            let len = files.length;

            for (let i = len - 1; i >= 0; i--) {
                files_reverse.push (files[i])
            }

            files = files_reverse

            reverse_short = false

            alert (`Files shorted by ${order_by} (reverse)`)

        } else {
            console.log ("reverse false")
            reverse_short = true

            alert (`Files shorted by ${order_by}`)
        }    

        // Update
        update_files ()
        update_data_list()
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

    update_data_list()
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

function update_data_list () {
    if (current_section == "merge") {
        files_merge = files
    } else if (current_section == "split") {
        files_split = files
    } else if (current_section == "jpg_pdf") { 
        files_jpg_pdf = files
    } else if (current_section == "pdf_jpg") {
        files_pdf_jpg = files
    } 
}

//  Call funtion 
drop_files ()

// Initial button status
update_buttons_status()


// Change section 


