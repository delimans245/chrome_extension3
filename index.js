let links = []
let inputEl = document.getElementById('input')
let saveBtn = document.getElementById('saveButton')
let saveTab = document.getElementById('saveTabButton');
let deleteBtn = document.getElementById('deleteButton');
let listEl = document.getElementById('list')
let linksFromStorage = JSON.parse(localStorage.getItem('links'))

if (linksFromStorage) {
    links = linksFromStorage
    render(links)
}

deleteBtn.addEventListener('click', function () {
    localStorage.removeItem('links')
    links = []
    listEl.innerHTML = ''
})

saveBtn.addEventListener('click', function () {
    links.push(inputEl.value)
    listEl.innerHTML = ''
    localStorage.setItem('links', JSON.stringify(links))
    render(links)
    inputEl.value = ''
})

saveTab.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(links) )
        listEl.innerHTML = ''
        render(links)
    })
})



function render(list) {
    for (let i = 0; i < list.length; i++) {
        listEl.innerHTML += `
        <li>
            <a href="${list[i]}" target="_blank">
                ${list[i]}
            </a>
        </li>`
    }
}
