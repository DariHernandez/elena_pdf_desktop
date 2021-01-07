// LEFT MENU
let button_merge = document.querySelector ('.item.merge')
let button_split = document.querySelector ('.item.split')
let button_jpg_pdf = document.querySelector ('.item.jpg_pdf')
let button_pdf_jpg = document.querySelector ('.item.pdf_jpg')

function remove_actives () {
    // Remove active class for all buttons
    button_merge.classList.remove ('active')
    button_split.classList.remove ('active')
    button_jpg_pdf.classList.remove ('active')
    button_pdf_jpg.classList.remove ('active')
}

function clicked_left_button (button) {
    // Event listener for active any buttons
    if (Array.from(button.classList).includes('active')) {
        remove_actives()
    } else {
        remove_actives()
        button.classList.add ('active')
    }
}

button_merge.addEventListener ('click', function () {
    clicked_left_button (button_merge)    
})

button_split.addEventListener ('click', function () {
    clicked_left_button (button_split)    
})

button_jpg_pdf.addEventListener ('click', function () {
    clicked_left_button (button_jpg_pdf)    
})

button_pdf_jpg.addEventListener ('click', function () {
    clicked_left_button (button_pdf_jpg)    
})
