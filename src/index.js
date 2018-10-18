document.addEventListener('DOMContentLoaded', () => {

  getPups()

  document.addEventListener('click', (event) => {

    if (event.target.className === 'dogButton') {
      let dogContainer = document.getElementById('dog-info')
      dogContainer.innerHTML = ''
      let dogImage = document.createElement('img')
      dogImage.src = event.target.imageUrl
      dogContainer.appendChild(dogImage)
      let dogHeader = document.createElement('h2')
      dogHeader.innerText = event.target.innerText
      dogContainer.appendChild(dogHeader)
      let goodButton = document.createElement('button')
      if (event.target.isGood === true) {
        goodButton.innerText = 'Good Dog'
        goodButton.className = 'goodButton'
        goodButton.id = event.target.id
        goodButton.isGood = event.target.isGood
        dogContainer.appendChild(goodButton)
      } else if (event.target.isGood === false) {
        goodButton.innerText = 'Bad Dog'
        goodButton.className= 'goodButton'
        goodButton.id = event.target.id
        goodButton.isGood = event.target.isGood
        dogContainer.appendChild(goodButton)
      }
    }

    if (event.target.className === 'goodButton') {
      if (event.target.isGood === true) {
        event.target.innerText = 'Bad Dog'
        let dogId = event.target.id
        fetch(`http://localhost:3000/pups/${dogId}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isGoodDog: false,
          })
        })
        event.target.isGood = false
        let filter = document.getElementById('good-dog-filter')
        if (filter.innerText === 'Filter good dogs: ON'){
          // clearDogBar()
          filterPups()
        }
      } else if (event.target.isGood === false) {
        event.target.innerText = 'Good Dog'
        let dogId = event.target.id
        fetch(`http://localhost:3000/pups/${dogId}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isGoodDog: true,
          })
        })
        event.target.isGood = true
        let filter = document.getElementById('good-dog-filter')
        if (filter.innerText === 'Filter good dogs: ON'){
          // clearDogBar()
          filterPups()
        }
      }
    }

    if (event.target.id === 'good-dog-filter'){
      if (event.target.innerText === 'Filter good dogs: OFF') {
        event.target.innerText = 'Filter good dogs: ON'
        // clearDogBar()
        filterPups()
      } else if (event.target.innerText === 'Filter good dogs: ON') {
        event.target.innerText = 'Filter good dogs: OFF'
        getPups()
      }
    }
  })

  function clearDogBar() {
    let dogBar = document.getElementById('dog-bar')
    dogBar.innerHTML = ''
  }

  function filterPups() {
    fetch('http://localhost:3000/pups')
    .then(results => results.json())
    .then(results => {
      clearDogBar()
      results.forEach(result => {
        if (result.isGoodDog === true) {
          createDogBar(result)
        }
      })
    })
  }

})

function getPups() {
  let dogBar = document.getElementById('dog-bar')
  dogBar.innerHTML = ''
  fetch('http://localhost:3000/pups')
  .then(results => results.json())
  .then(results => {
    results.forEach(result => createDogBar(result))
  })
}

function createDogBar(pup) {
  let headerContainer = document.getElementById('dog-bar')
  let dogButton = document.createElement('span')
  dogButton.id = pup.id
  dogButton.innerText = pup.name
  dogButton.className = 'dogButton'
  dogButton.imageUrl = pup.image
  dogButton.isGood = pup.isGoodDog
  headerContainer.appendChild(dogButton)
}
