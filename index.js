const STATIONS = [
  // Switzerland
  'Zermatt Bus Terminal',
  'Interlaken Ost Bus Station',
  'Grindelwald Bus Terminal',
  'Lauterbrunnen Bahnhof',
  'Lucerne Bahnhofquai',
  'Chamonix-Mont-Blanc Sud (France, near Swiss border)',
  'Geneva Bus Station',
  'Bern PostAuto Terminal',
  'Gstaad Bus Station',
  'St. Moritz Bahnhof PostAuto',
  'Verbier Village',
  'Davos Platz Postautohaltestelle',
  'Andermatt Gotthardpass',
  'Täsch Bahnhof (Shuttle to Zermatt)',
  'Flims Dorf Post',

  // France
  'Chamonix Sud Bus Station',
  'Annecy Gare Routière',
  'Grenoble Gare Routière',
  'Nice Airport (Bus to Alps)',
  'Bourg-Saint-Maurice Gare Routière',
  'Morzine Gare Routière',
  'Les Gets Gare Routière',
  "Val d'Isère Centre",
  'Courchevel 1850',
  'Megève Place du Village',

  // Italy
  'Aosta Autostazione',
  'Bolzano Autostazione',
  'Trento Autostazione',
  "Cortina d'Ampezzo Autostazione",
  'Bormio Bus Station',
  'Livigno Centro',
  'Merano Autostazione',
  'Sestriere Bus Stop',
  'Ortisei (St. Ulrich) Autostazione',
  'Canazei Piazza Marconi',

  // Austria
  'Innsbruck Hauptbahnhof Bus Terminal',
  'Salzburg Süd Busbahnhof',
  'Mayrhofen Bahnhof',
  'Lech am Arlberg Postamt',
  'Kitzbühel Hahnenkammbahn',
  'Ischgl Seilbahn',
  'Zell am See Postplatz',
  'Bad Gastein Bahnhof',
  'St. Anton am Arlberg Bahnhof',
  'Sölden Postamt',

  // Germany
  'Garmisch-Partenkirchen Bahnhof (Bus Station)',
  'Berchtesgaden Busbahnhof',
  'Oberstdorf Busbahnhof',
  'Füssen Bahnhof (Bus Station)',
  'Mittenwald Bahnhof (Bus Station)',

  // Slovenia
  'Bled Bus Station',
  'Bohinj Jezero',
  'Kranjska Gora Avtobusna Postaja',
]

// people increment decrement buttons

const incrementButton = document.querySelector('#incrementButton')
const decrementButton = document.querySelector('#decrementButton')
const peopleCounter = document.querySelector('#peopleCount')

// set local storage
let peopleCount = parseInt(localStorage.getItem('peopleCount')) || 1
peopleCounter.innerText = peopleCount

function changePeopleCount(increase = true) {
  peopleCount = parseInt(localStorage.getItem('peopleCount')) || 1
  if (increase) {
    peopleCount += 1
  } else {
    if (peopleCount > 1) {
      peopleCount -= 1
    }
  }
  localStorage.setItem('peopleCount', peopleCount)
  console.log('people count:', peopleCount)
  return peopleCount
}

incrementButton.addEventListener('click', () => {
  peopleCounter.innerText = changePeopleCount(true)
})

decrementButton.addEventListener('click', () => {
  peopleCounter.innerText = changePeopleCount(false)
})

// departure arrival UI

const departureInput = document.querySelector('#departureInput')
const arrivalInput = document.querySelector('#arrivalInput')
const departureGroup = document.querySelector('.departureGroup')
const arrivalGroup = document.querySelector('.arrivalGroup')
const departureStationsItemsList = departureGroup.querySelector('.stationsList')
const arrivalStationsItemsList = arrivalGroup.querySelector('.stationsList')
const stationsListContainerAll = document.querySelectorAll(
  '.stationsListContainer',
)

function fillList(parent, array) {
  parent.textContent = ''
  array.map((station) => {
    const liItem = document.createElement('li')
    liItem.textContent = station
    parent.append(liItem)
  })
}

fillList(stationsListContainerAll[0], STATIONS)
fillList(stationsListContainerAll[1], STATIONS)

function filterStations(searchString, array) {
  let filteredArray = []

  filteredArray = array.filter((station) => {
    return station.trim().toLowerCase().includes(searchString)
  })
  console.log('filteredArray', filteredArray)
  if (filteredArray.length === 0) {
    filteredArray[0] = 'Not found'
  }
  return filteredArray
}

departureInput.addEventListener('focus', () => {
  if (departureStationsItemsList) {
    departureStationsItemsList.classList.remove('hidden')
  }
})

departureInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (departureStationsItemsList) {
      departureStationsItemsList.classList.add('hidden')
    }
  }, 0)
})

departureInput.addEventListener('input', () => {
  let searchString = departureInput.value.trim().toLowerCase()
  let filteredArray = filterStations(searchString, STATIONS)
  fillList(stationsListContainerAll[0], filteredArray)
})

arrivalInput.addEventListener('focus', () => {
  if (arrivalStationsItemsList) {
    arrivalStationsItemsList.classList.remove('hidden')
  }
})

arrivalInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (arrivalStationsItemsList) {
      arrivalStationsItemsList.classList.add('hidden')
    }
  }, 0)
})

arrivalInput.addEventListener('input', () => {
  let searchString = arrivalInput.value.trim().toLowerCase()
  let filteredArray = filterStations(searchString, STATIONS)
  fillList(stationsListContainerAll[1], filteredArray)
})

stationsListContainerAll.forEach((container) => {
  container.addEventListener('mousedown', (event) => {
    let liItem = event.target.closest('li')
    let parent = event.target.closest('.inOutItem')
    let input = parent.querySelector('input')
    if (input && liItem) {
      input.value = liItem.textContent
    }
  })
})

// burger menu
const burgerCheckbox = document.querySelector('#burgerCheckbox')
const menuSvgIcon = document.querySelector('.menuSvgIcon')
const crossSvgIcon = document.querySelector('.crossSvgIcon')

function changeBurgerMenuItem() {
  if (burgerCheckbox.checked) {
    crossSvgIcon.classList.add('hidden')
    menuSvgIcon.classList.remove('hidden')
  } else {
    menuSvgIcon.classList.add('hidden')
    crossSvgIcon.classList.remove('hidden')
  }
}

burgerCheckbox.addEventListener('click', changeBurgerMenuItem)

// aaccordeon

const faqs = document.querySelector('#faqs')
const faqsIcons = document.querySelectorAll('.questionIcon')

function changeFaqsIcons(iconActive) {
  faqsIcons.forEach((icon) => {
    icon.className = 'questionIcon'
  })
  iconActive.classList.add('activeQuestionIcon')
}

faqs.addEventListener('click', (event) => {
  let question = event.target.closest('.containerQuestion')
  if (question) {
    let icon = question.querySelector('.questionIcon')
    changeFaqsIcons(icon)
  }
})
