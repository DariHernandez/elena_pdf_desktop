const { ipcRenderer } = require('electron')

theme_buttons = document.querySelectorAll('.theme')
merge_buttons = document.querySelectorAll ("#merge > div > div.button")

for (let i=0; i<theme_buttons.length; i++) {

    theme_buttons[i].addEventListener('click', async () => {
        const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
    })
}

