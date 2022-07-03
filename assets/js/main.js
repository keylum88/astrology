const localStorage = window.localStorage
const body = document.querySelector('body')

var view = null

// Makes a command to the system and outputs return value to specified element by id
function fetchResponse(cmd, output, displayLoader = true) { 

  let uniq = 'id' + (new Date()).getTime()

  if (output !== null) {
  
    let loader = `<div class="loader"><img src="/images/load.gif"></div>`
    if (displayLoader) {
    
      document.getElementById(output).innerHTML = loader
    
    }

  }

    return fetch('/?cmd='+cmd+'&uniq='+uniq).then(function(response) {

        return response.text()

    }).then(function (text) {

        trim = text.trim()

        if (output != null) { document.getElementById(output).innerHTML = trim }

    })

}


function callServer(cmd, params=null) {

  let uniq = 'id' + (new Date()).getTime()
  return fetch('/?cmd='+cmd+'&uniq='+uniq+params)

}

async function displayDashboard() {

  view = 'dashboard'

  await fetchResponse('get-view&view=dashboard', 'view', false)

    callServer('get-view', '&view='+view).then(response=>{

      return response.text()

    }).then(result=>{

      // Do after

    })

}

function findView(data) {

  let find = data.match(/-v ([a-z\-]+)/)
  return find[1];

}

// Initialize app

callServer('get-astrology').then(response=>{return response.text()}).then(result=>{

  console.log(result)
  displayDashboard()

})