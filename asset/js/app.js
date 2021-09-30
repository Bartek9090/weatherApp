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

let APIURL = "http://api.weatherapi.com/v1/current.json?key=21d65c223c50438b841180651213009%20&q="
let weather_form = document.querySelector('.weather-form');
let data_container = document.querySelector('.data-from-api')
weather_form.addEventListener('submit', (event) => {
    let city = document.querySelector('.city').value;
    let NEWAPIURL = APIURL + city;
    fetch(NEWAPIURL)
        .then(response => response.json())
        .then((data) => {
            data_container.innerHTML += `<div class='main-info'>Today (${data.location.localtime}) 
                 in ${data.location.name} is ${data.current.temp_c}<sup>o</sup>C </div>`
        })


    event.preventDefault();
})