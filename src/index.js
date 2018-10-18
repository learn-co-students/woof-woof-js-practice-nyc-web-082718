const filter = document.querySelector('#good-dog-filter')
let filtering = false
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')

listAllDogs()
function listAllDogs() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => {
      dogBar.innerHTML = ''
      dogs.forEach(listDogName)
    })
}

function listGoodDogs() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => {
      return dogs.filter((dog) => {
        return dog.isGoodDog
      })
    })
    .then(goodDogs => {
      dogBar.innerHTML = ''
      goodDogs.forEach(listDogName)
    })
}

addFilterEventListener()
function addFilterEventListener() {
  filter.addEventListener('click', () => {
    filtering = !filtering
    if (filtering) {
      filter.innerText = 'Filter good dogs: ON'
      listGoodDogs()
    } else {
      filter.innerText = 'Filter good dogs: OFF'
      listAllDogs()
    }
  })
}


////////////////////
// helper
////////////////////
function listDogName(dog) {
  // list dog name
  const dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name
  dogBar.appendChild(dogSpan)

  // add event listener to click on individual dog
  dogSpan.addEventListener('click', () => {
    displayDogInfo(dog)
  })
}

function displayDogInfo(dog) {
  const dogImage = document.createElement('img')
  const dogName = document.createElement('h2')
  const dogGood = document.createElement('button')

  dogImage.src = dog.image
  dogName.innerText = dog.name
  dogGood.innerText = (dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!')
  dogGood.addEventListener('click', () => {
    dogGoodButton(dog)
  })

  dogInfo.innerHTML = ''
  dogInfo.appendChild(dogImage)
  dogInfo.appendChild(dogName)
  dogInfo.appendChild(dogGood)
}

function dogGoodButton(dog) {
  const dogGoodness = !dog.isGoodDog
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: dogGoodness
    })
  })
    .then(res => {
      fetch(`http://localhost:3000/pups/${dog.id}`)
        .then(res => res.json())
        .then(displayDogInfo)
    })
}
