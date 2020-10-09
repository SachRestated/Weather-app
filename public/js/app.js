console.log('Client side JavaScript loaded!!')

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
    fetch(`http://localhost:3000/weather?address=${location}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {
                    const text = `${data.forecast.weather_descriptions[0]}. It is currently ${data.forecast.temperature} out there. Feels like ${data.forecast.feelslike} degrees.`
                    msg1.textContent = data.location
                    msg2.textContent = text
                }

            })
        }
    )
})