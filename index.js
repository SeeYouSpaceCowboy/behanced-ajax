$(document).ready(addFormEventHandler)

function addFormEventHandler(){
  $('form#project-form').submit(submit)
}

function submit(event){
  event.preventDefault()
  findAndDisplayProjects()
}

function findAndDisplayProjects(){
  const apiKey = "&client_id=wVIfxtGGRLkxY6ZkKm9k3Pf8cwyAVMAX"
  const URL = "https://api.behance.net/v2/projects?q="

  let $input = $('input#query')
  let userInput = $input.val()
  let query = userInput.split(' ').join('+')
  $input.val('')

  $.ajax({
    dataType: 'jsonp',
    url: `${URL}${query}${apiKey}`,
    success: displayProjects
  })
}

function displayProjects(data){
  let projects = $('div#projects')
  projects.html('')

  function displayProject(project){
    let name = project.name
    let url = project.url
    let imgUrl = project.covers['230']
    projects.append(`<a href='${url}' target='_blank'>
    <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src="${imgUrl}">
              <span class="card-title">${name}</span>
            </div>
          </div>
        </div>
      </div>
    </a>`)
  }

  data.projects.forEach(displayProject)
}
