let apiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';

let list = document.querySelector('.list');
let els = [];
function Ele(title){
  this.title = title;
}

function timeafter(){
  setTimeout(() => {
   console.log(els.length);
   for (let i=0; i<els.length; i++) {
     getel(els[i].title);
   }
 },1000);
}

 function getel(value){
    value = value.split(' ').join('%20');
    let requestUrl = apiUrl + value + '&callback=?';
    $.ajax({
        url: requestUrl,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function(data) {
          //console.log(data);
          let content = document.querySelector('.content');
          content.style.height = '100%';
          list.innerHTML += "<div class='row d-flex justify-content-center'><div class='col-sm-6'><div class='card'><div class='card-body'><h5 class='card-title text-dark'>"+"<a href='https://en.wikipedia.org/wiki/"+value.split('%20').join('_')+"' alt='article' target='_blank' class='text-dark'>"+value.split('%20').join(' ')+"</a></h5><p class='card-text text-dark'>"+data.query.pages[Object.keys(data.query.pages)[0]].extract.split('.')[0] +"</p></div></div></div><br>";
          //console.log(data.query.pages[Object.keys(data.query.pages)[0]].extract.split('.')[0] );
         },
        error: function() { alert('Failed!'); }
    });
}

$('#search').click(() => {
  let content = document.querySelector('.content');
  content.style.height = '100vh';
  let value = $('.form-control').val();
  if (value != ''){
    list.innerHTML = "";
    let searchrequestUrl = searchUrl + value + '&callback=?';
    $.ajax({
        url: searchrequestUrl,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        async: false,
        success: function(data) {
          //console.log(data);
          let content = document.querySelector('.content');
          content.style.height = '100%';
          for(let i=0;i<data[1].length; i++){
            els[i] = new Ele(data[1][i]);
            //console.log(data[1][i]);
          }
        },
        error: function() { alert('Failed!'); }
    });
  }


timeafter();
});
