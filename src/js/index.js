// LEFT MENU
let button_merge = document.querySelector ('.item.merge')
let button_split = document.querySelector ('.item.split')
let button_jpg_pdf = document.querySelector ('.item.jpg_pdf')
let button_pdf_jpg = document.querySelector ('.item.pdf_jpg')

let frame = document.querySelector ('#main_frame')

function remove_actives () {
    // Remove active class for all buttons
    button_merge.classList.remove ('active')
    button_split.classList.remove ('active')
    button_jpg_pdf.classList.remove ('active')
    button_pdf_jpg.classList.remove ('active')
}


function clicked_left_button (button, frame_link) {

    // Get documents in the frop area
    frame = document.querySelector('iframe')
    files = frame.contentDocument.body.querySelectorAll('body > div > div.drop_area.files > div > div')

    // Set empty file list
    if (files == undefined) {
        files = []
    }

    let changes_tap = true

    // Verify number of files
    if (files.length > 0) {

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
            frame.setAttribute("src", "html/home.html")  

        } else {

            // Hide home / Show other frame
            frame.setAttribute("src", frame_link) 
            
            remove_actives()
            button.classList.add ('active')
        }  

    }

}

button_merge.addEventListener ('click', function () {
    clicked_left_button (button_merge, "html/merge.html")
})

button_split.addEventListener ('click', function () {
    clicked_left_button (button_split, "html/split.html")    
    // frame.setAttribute("src", )  
})

button_jpg_pdf.addEventListener ('click', function () {
    clicked_left_button (button_jpg_pdf, "html/jpg_pdf.html")  
})

button_pdf_jpg.addEventListener ('click', function () {
    clicked_left_button (button_pdf_jpg, "html/pdf_jpg.html")   
})
