// LEFT MENU
let button_merge = document.querySelector ('.item.merge')
let button_split = document.querySelector ('.item.split')
let button_jpg_pdf = document.querySelector ('.item.jpg_pdf')
let button_pdf_jpg = document.querySelector ('.item.pdf_jpg')
let section_home = document.querySelector ("#home")
let section_merge = document.querySelector ("#merge")
let section_split = document.querySelector ("#split")
let section_jpg_pdf = document.querySelector ("#jpg_pdf")
let section_pdf_jpg = document.querySelector ("#pdf_jpg")

let frame = document.querySelector ('#main_frame')

function remove_actives () {
    // Remove active class for all buttons
    button_merge.classList.remove ('active')
    button_split.classList.remove ('active')
    button_jpg_pdf.classList.remove ('active')
    button_pdf_jpg.classList.remove ('active')

    section_home.classList.remove ('active') 
    section_merge.classList.remove ('active') 
    section_split.classList.remove ('active') 
    section_jpg_pdf.classList.remove ('active')
    section_pdf_jpg.classList.remove ('active')
}


function clicked_left_button (button, selector) {

    // Get documents in the frop area
    let files_counter = document.querySelectorAll('#merge > div > label > div > div')

    // Set empty file list
    if (files_counter == undefined) {
        files_counter = []
    }

    let changes_tap = true

    // Verify number of files
    if (files_counter.length > 0) {

        changes_tap = false
                
        // Question to changes menu
        if (confirm("Your files will be lost. Do you want to continue?")) {
            changes_tap = true
        } 
    }


    if (changes_tap == true) {

        // Event listener for active any buttons
        if (Array.from(button.classList).includes('active')) {
            remove_actives()  
            // Show home
            section_home.classList.add ("active") 
        } else {            
            remove_actives()
            button.classList.add ('active')
            document.querySelector (selector).classList.add ("active")
        }  
    }
}

button_merge.addEventListener ('click', function () {
    clicked_left_button (button_merge, "#merge")
})

button_split.addEventListener ('click', function () {
    clicked_left_button (button_split, "#split")    
    // frame.setAttribute("src", )  
})

button_jpg_pdf.addEventListener ('click', function () {
    clicked_left_button (button_jpg_pdf, "#jpg_pdf")  
})

button_pdf_jpg.addEventListener ('click', function () {
    clicked_left_button (button_pdf_jpg, "#pdf_jpg")   
})

