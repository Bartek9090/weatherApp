// switcher for theames day night

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

let APIURL = "http://api.weatherapi.com/v1/forecast.json?key=21d65c223c50438b841180651213009%20&days=5&q="
let weather_form = document.querySelector('.weather-form');
let data_container = document.querySelector('.data-from-api')
let loader = document.querySelector('.loader')



weather_form.addEventListener('submit', (event) => {
    showLoader();
    let city = document.querySelector('.city').value;
    let NEWAPIURL = APIURL + city;

    fetch(NEWAPIURL)
        .then((response) => {
            if (response.status === 200) {
                hideLoader();
                return response.json()
            } else {
                hideLoader()
                return showError();
            }
        })
        .then((data) => {
            let view = '';

            view += `<div class="main-info">`;

            //icon
            view += `<div class="icon">`;
            view += `<img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`
            view += `</div>`;
            //temp
            view += `<div class="temp">`;

            view += `<div class="temp-value" data-cel="${data.current.temp_c}" data-far="${data.current.temp_f}" >`;
            view += data.current.temp_c;
            view += `</div>`;

            view += `<ul>
                <li class="change-temp active"><sup>o</sup>C</li>
                <li class="change-temp"><sup>o</sup>F</li>

            </ul>`

            view += `</div>`;

            // info 

            view += `<div class="info">
                <p>The amount of rainfall: ${data.current.precip_mm}mm</p>
                <p>humidity: ${data.current.humidity}</p>
                <p>Wind: ${data.current.wind_mph}mph</p>
                </div>`;


            // close main info
            view += `</div>`;

            // show next days by city

            view += `<div class="days-info">Next day weather: </div>`;
            view += `<div class="days">`;
            data.forecast.forecastday.forEach((day) => {
                view += `<div class="day">`;
                view += `<div class="date">${day.date}</div>`;
                view += `<div class="icon"><img src="${day.day.condition.icon}" alt="${day.day.condition.tex}"></div>`;
                view += `<div class="temp">"${day.day.avgtemp_c}<sup>o</sup>C</div>`;
                view += `</div>`;
            })
            view += `</div>`;




            setTimeout(() => {
                data_container.innerHTML = view;
            }, 100)
        })



    event.preventDefault();
})

function showError() {
    setTimeout(() => {
        data_container.innerHTML = `<div class="error">City not found or we we gave problem with API</div>`;
    }, 100)

}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    setTimeout(() => {
        loader.style.display = 'none'
    }, 100)
}

