let root_element = document.documentElement;
let switcher = document.querySelector('.switcher')

switcher.addEventListener('click', () => {
    if (switcher.classList.contains('day')) {
        switcher.classList.remove('day');
        switcher.classList.add('night');
        root_element.dataset.theme = "night";
    } else {
        switcher.classList.remove('night');
        switcher.classList.add('day');
        root_element.dataset.theme = "day";

    }
})
