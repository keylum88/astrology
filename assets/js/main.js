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

  let parse = result.split('|||')
  let json = JSON.parse(parse[0])
  let txt = parse[1]

  let count = 0;
  for (title in json) {

    let findDefinitionData = new RegExp(title+'[\\s\\S]*?[A-Z][A-Z]')
    
    let definitionData = txt.match(findDefinitionData)

    if (definitionData !== null) {
    
      let splitByNewLine = definitionData[0].split("\n")
      
      json[title] = []
      splitByNewLine.forEach(paragraph=>{

        paragraph = paragraph.replace(/\r/, '').trim()
        if (paragraph.length > 4 && paragraph.match(/[A-Z][A-Z][A-Z]/) === null) {
        
          json[title].push(paragraph)
        
        }

      })

      count++
  
    }

    else {

      console.log(title+' not found.')

    }

  }

  console.log(count)
  console.log(json)

  displayDashboard()

})