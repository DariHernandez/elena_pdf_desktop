const { ipcRenderer } = require('electron')

theme_buttons = document.querySelectorAll('.theme')
merge_buttons = document.querySelectorAll ("#merge > div > div.button")

for (let i=0; i<theme_buttons.length; i++) {

    theme_buttons[i].addEventListener('click', async () => {
        const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
    })
}

// // Open files clicking in the drop area
// drop_areas = document.querySelectorAll (".drop_area")

// for (let i = 0; i < drop_areas.length; i++) {
//     drop_areas[i].addEventListener ('click', open_file)
// }

// function open_file () {
//     console.log(dialog)
// }