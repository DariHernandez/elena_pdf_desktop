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

function clicked_left_button (button, selector, pdf) {
    // Event listener for active any buttons

    // Acive and disable sections
    if (Array.from(button.classList).includes('active')) {
        // Return to home
        remove_actives()  
        section_home.classList.add ("active") 
        current_section = "home"
    } else {            
        // Show new section
        remove_actives()
        button.classList.add ('active')
        document.querySelector (selector).classList.add ("active")
        current_section = String(selector).substr(1,String(selector).length)
    }  

    // Set variables for each section
    let selector_holder = selector + " > div > label"
    holder = document.querySelector (selector_holder)

    if (pdf == true) {
        text_drop_area = "Drop your PDF FILES here or Click"
    } else {
        text_drop_area = "Drop your JPG IMAGES here or Click"
    }    

    // Restart short button status
    reverse_short_date = false
    reverse_short_name = false
}

button_merge.addEventListener ('click', function () {
    clicked_left_button (button_merge, "#merge", true)
    files = files_merge
    update_buttons_status()
    drop_files ()
})

button_split.addEventListener ('click', function () {
    clicked_left_button (button_split, "#split", true)    
    files = files_split
    update_buttons_status()
    drop_files ()
})

button_jpg_pdf.addEventListener ('click', function () {
    clicked_left_button (button_jpg_pdf, "#jpg_pdf", false)  
    files = files_jpg_pdf
    update_buttons_status()
    drop_files ()
    
})

button_pdf_jpg.addEventListener ('click', function () {
    clicked_left_button (button_pdf_jpg, "#pdf_jpg", true)   
    files = files_pdf_jpg
    update_buttons_status()
    drop_files ()
})
