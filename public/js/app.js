const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (evt)=> {
    evt.preventDefault();

    const location = evt.target[0].value;

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    // console.log(location);
    fetch(`/weather?address=${location}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {
                    console.log(data)
                    const {region, country, temperature, feelslike, weather_descriptions: w, humidity} = data.forecast
                    const text = `${w[0]}. It is currently ${temperature} degrees out there. Feels like ${feelslike} degrees. The humidity is ${humidity}%`
                    msg1.textContent = `${data.location}, ${region}, ${country}`
                    msg2.textContent = text
                }

            })
        }
    )
})