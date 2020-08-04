
function listRepos(url){
    console.log("listRepos");
    console.log(url);
    const repoUrl=url+"/repos";
    console.log(repoUrl);
    fetchRepos(repoUrl)
}

function fetchRepos(repoUrl){
    console.log("fetchRepos");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

    
    console.log(repoUrl);
     fetch(repoUrl,requestOptions)    
    .then(response => response.json())
    .then(responseJson => displayRepos(responseJson))
    .catch(error => console.log('error',error))
    

}

function displayRepos(responseJson){
    console.log("displayRepos");
    console.log(responseJson.name);
    
    $('#repoResults').append(`
    <ul>List of Repos
        <li id="listingRepos"></li>
    </ul>
    `)
    for(let i=0;i<responseJson.length;i++){
        //console.log(responseJson[0]);
    $('#listingRepos').append(`
        <li><a href="https://github.com/${responseJson[i].full_name}">${responseJson[i].name}</a></li>
    

    `)
    }
}


function displayInfo(responseJson){
    console.log(responseJson)

    $('#divResult').append(
        `<ul>Name:${responseJson.name}
            <li><a href="${responseJson.html_url}">Github Page</a></li>`
            )
            
        if ($('input[type="checkbox"]').prop('checked')){
                listRepos(responseJson.url)
            }

            
    
}  

 function getBasic(userName){
    //console.log("hi!");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

    const url = `https://api.github.com/users/${userName}`;
    //console.log(url);
    fetch(url,requestOptions)
    .then(response => response.json())
    .then(responseJson => displayInfo(responseJson))
    .catch(error => console.log('error',error))
    //console.log();
}

function readyForm(){
    $('#js-userForm').submit(event =>{
        event.preventDefault();
        $('#divResult').empty("");
        $('#repoResults').empty("");
        const userName = $('#js-userName').val();
        $('#js-userName').val("");
        console.log(userName);
        getBasic(userName)
    })
}

const apiKey = '833ea1b9d7mshbef97797dff363dp1d9ac4jsna2801a24e32d'
    $(readyForm());
