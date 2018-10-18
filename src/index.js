dogURL = 'http://localhost:3000/pups';
DOGS = new URL('http://localhost:3000/pups');
FILTER = false;

const dogBar = (dog) => {
  return `<span onClick="showInfo(${dog.id})">${dog.name}</span>`;
}

const dogInfo = (dog) => {
  return `<img src="${dog.image}">
          <h2>${dog.name}</h2>
          <button name="isGood" onClick="goodBad(${dog.id})">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
}

const showDogs = (url) => {
  fetch(url)
  .then(resp => resp.json())
  .then(dogsJSON => {
    document.getElementById('dog-bar').innerHTML = dogsJSON.map(dog => dogBar(dog)).join('');
  })
}

const showInfo = (id) => {
  fetch(`${dogURL}/${id}`)
    .then(resp => resp.json())
    .then(dogJSON => {
      document.getElementById('dog-info').innerHTML = dogInfo(dogJSON);
    });
}

const goodBad = (id) => {
  const isGood = !/Good/.test(event.target.innerText);
  fetch(`${dogURL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: isGood
    })
  })
    .then(resp => resp.json())
    .then(json => {
      document.getElementById('dog-info').innerHTML = dogInfo(json);
      showDogs(DOGS);
    })
}

document.addEventListener('DOMContentLoaded', event => {
  const filterBtn = document.getElementById('good-dog-filter');
  showDogs(DOGS);
  // bonus
  filterBtn.addEventListener('click', event => {
    if (!FILTER) {
      FILTER = true;
      filterBtn.innerText = "Filter good dogs: ON";
      DOGS.search = new URLSearchParams({isGoodDog: true});
      showDogs(DOGS);
    } else {
      FILTER = false;
      filterBtn.innerText = "Filter good dogs: OFF";
      DOGS.search = '';
      showDogs(DOGS);
    }
  })
})
