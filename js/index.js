const searchForm = document.getElementById('searchForm')
const show = document.getElementById('show')
const stopBtn = document.getElementById('stop')
const searchInput = document.getElementById('searchInput')
let slideshow = []
let currentIndex = 0
let interval = null

const fetchReddit = (searchTerm) => {
    fetch(`http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`)
    .then(response => response.json())
    .then(result => {
        let photosOnly = result.data.children.filter(child => {
            return child.data.post_hint === 'image'
        })
        slideshow = photosOnly
        console.log(slideshow)
    })
    .then(() => {
        startShow()
    })
}

const search = (e) => {
    e.preventDefault()
    fetchReddit(searchInput.value)
}

const startShow = () => {
    currentIndex = 0
    let searchImg = document.createElement('img')
    searchImg.src = slideshow[currentIndex].data.url
    searchImg.alt = slideshow[currentIndex].data.title
    show.append(searchImg)
    interval = setInterval(() => {
        currentIndex++
        if(currentIndex > slideshow.length - 1){
            currentIndex = 0
        }
        searchImg.src = slideshow[currentIndex].data.url
        searchImg.alt = slideshow[currentIndex].data.title
    }, 2000)
}

const stopShow = () => {
    currentIndex = 0
    clearInterval(interval)
}

// fetchReddit('cats')
searchForm.addEventListener('submit', search)
stopBtn.addEventListener('click', stopShow)