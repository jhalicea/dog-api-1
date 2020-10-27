function validateInputs(number, breed) {
//validate number
  let newNumber = 0;
  if (number < 1 || number > 50) {
    newNumber = 3;
  } else {
    newNumber = number;
  }

  //need to validate strings...

  getDogImage(newNumber, breed);

}

function btnListener() {
  $('form').on('click', '.submit', (event) => {
    event.preventDefault();

    let breed = $('#breed-input').val();

    let number = $('#number-input').val();
    validateInputs(number, breed);
  });
}

function getDogImage(number, breed) {
  console.log(breed);
  let apiURL = 'https://dog.ceo/api/';
  let apiOption = 'breeds/image/random/';

  if(breed !== ''){
    apiOption = `breed/${breed}/images/random/`;
  }
  console.log(apiOption);
  let url = apiURL + apiOption + number;

  

  const promise = fetch(url);
  promise.then(response => response.json())
    .then(responseJson => output(responseJson, breed))
    .catch(error => alert(`Something went wrong. Try again later. ${error}`));
}

function output(responseJson, breed) {

  let imgHTML = '';
  if (responseJson.status === 'error') {
    imgHTML = `<h2>Breed Not Found. ${breed.toUpperCase()} Does Not Exist</h2>`;
  } else {
    for(let img of responseJson.message) {
      imgHTML += `<img src="${img}" alt="Image of Dog">`;
    }
  }

  $('.dog-output').html(imgHTML);

}

function app() {
  btnListener();
}

$(app());
