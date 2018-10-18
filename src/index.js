document.addEventListener('DOMContentLoaded', (event) => {

  const grabContentDiv = document.getElementById('dog-bar')
  const grabDogInfoDiv = document.getElementById('dog-info')

  fetch('http://localhost:3000/pups')
    .then( resp => resp.json() )
    .then( parsedResp => {

      const pups = parsedResp

      pups.forEach((pup) => {

        let span = document.createElement('span')

        span.innerText = `${pup.name}`
        grabContentDiv.appendChild(span)


        span.addEventListener('click', (event) => {
          let image = document.createElement('img')
          let header = document.createElement('h2')
          let button = document.createElement('button')

          image.src = `${pup.image}`
          header.innerText = `${pup.name}`
          if (pup.isGoodDog) {
            button.innerText = 'Good Dog!'
          }
          else {
            button.innerText = 'Bad Dog!'
          }

          button.addEventListener('click', (event) => {
            let pupId = `${pup.id}`
            let changeDogStatus = ''

            if (button.innerText === "Good Dog!") {
              button.innerText = "Bad Dog!"
              changeDogStatus = false
            }
            else {
              button.innerText = "Good Dog!"
              changeDogStatus = true
            }

            fetch(`http://localhost:3000/pups/${pupId}`, {
             method: 'PATCH',//send an HTTP POST request
             headers: { //data about our request; metadata
               'Accept': 'application/json',//i (the client/browser) will ACCEPT json as a response from the server
               'Content-Type': 'application/json'// i (the client/browser) am SENDING the server JSON
             },
             body: JSON.stringify({ //we are sending you the following JSON data; our rails controller will see this in the params
               isGoodDog: changeDogStatus, //this object must be turned into JSON
             })
           })
           .then(function(response) {
             return response.json()
           })
          })

          grabDogInfoDiv.appendChild(image)
          grabDogInfoDiv.appendChild(header)
          grabDogInfoDiv.appendChild(button)

        })


      })

    })
})
