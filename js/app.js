"use strict";

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);

  var nullMentes = userDatas.filter(function (asd) {
    return asd.cost_in_credits !== null;
  });
  //console.log(nullMentes);

  var nullos = userDatas.filter(function (dsa) {
    return dsa.cost_in_credits === null;
  });
  //console.log(nullos);

  function nullMentesRendezes(arr) {
    var i = arr.length;
    var swap = false;
    do {
      swap = false;
      for (var j = 0; j < i - 1; j++) {
        if (parseInt(arr[j].cost_in_credits) > parseInt(arr[j + 1].cost_in_credits)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          swap = true;
        }
      }
      i--;
    } while (i >= 0 && swap)
    return arr;
  };
  var rendezettNullmentesTomb = nullMentesRendezes(nullMentes);
  //console.log(rendezettTomb);

  //Array.prototype.push.apply(nullos, rendezettNullmentesTomb)
  //console.log(nullos);
  var mindenRendezve = [];
  for (var i in nullos) {
    var shared = false;
    for (var j in rendezettNullmentesTomb)
      if (rendezettNullmentesTomb[j] == nullos[i]) {
        shared = true;
        break;
      }
    if (!shared) mindenRendezve.push(nullos[i])
  }
  mindenRendezve = mindenRendezve.concat(rendezettNullmentesTomb);
  //console.log(mindenRendezve);

  function consNullTorles() {
    for (let i = 0; i < mindenRendezve.length; i++) {
      if (mindenRendezve[i].consumables === null) {
        mindenRendezve.splice(i, 1);
      }
    }
    return mindenRendezve;
  }
  var consNullTorlolve = consNullTorles();
  //console.log(consNullTorlolve);

  /*
  sehogysem megy  
  function nullUnknowra(array) {
    for (let i = 0; i < array.length; i++) {
      for (const member in array[i]) {
        if (array[i][member] === null) {
          array[i][member] = 'unknown';
        }
      }
    }
  }
  var veglegesTomb = nullUnknowra(consNullTorlolve);
  console.log(veglegesTomb);
*/

  function fillScreen(asdf) {
    for (let i = 0; i < asdf.length; i++) {
      var list = document.querySelector('.shapceship-list')
      var hajoDiv = document.createElement('DIV');
      var kep = document.createElement('IMG');
      var szovegDiv = document.createElement('DIV');
      var szovegConsumables = document.createElement('P');
      var szovegDenomination = document.createElement('P');
      var szovegCargoCapacity = document.createElement('P');
      var szovegPassengers = document.createElement('P');
      var szovegMaxAtmospheringSpeed = document.createElement('P');
      var szovegCrew = document.createElement('P');
      var szovegLengthiness = document.createElement('P');
      var szovegModel = document.createElement('P');
      var szovegCostInCredits = document.createElement('P');
      var szovegManufacturer = document.createElement('P');

      kep.setAttribute('src', 'img/' + asdf[i].image);
      kep.setAttribute('alt', asdf[i].image)
      list.appendChild(hajoDiv);
      hajoDiv.appendChild(kep);
      hajoDiv.appendChild(szovegDiv);
      hajoDiv.classList.add('hajodiv');
      szovegDiv.appendChild(szovegConsumables);
      szovegDiv.appendChild(szovegDenomination);
      szovegDiv.appendChild(szovegCargoCapacity);
      szovegDiv.appendChild(szovegPassengers);
      szovegDiv.appendChild(szovegMaxAtmospheringSpeed);
      szovegDiv.appendChild(szovegCrew);
      szovegDiv.appendChild(szovegLengthiness);
      szovegDiv.appendChild(szovegModel);
      szovegDiv.appendChild(szovegCostInCredits);
      szovegDiv.appendChild(szovegManufacturer);
      szovegConsumables.innerText = 'Consumables: ' + asdf[i].consumables;
      szovegDenomination.innerText = 'Denomination: ' + asdf[i].denomination;
      szovegCargoCapacity.innerText = 'Cargo capacity: ' + asdf[i].cargo_capacity;
      szovegPassengers.innerText = 'Passengers: ' + asdf[i].passengers;
      szovegMaxAtmospheringSpeed.innerText = 'Max atmosphering speed: ' + asdf[i].max_atmosphering_speed;
      szovegCrew.innerText = 'Crew: ' + asdf[i].crew;
      szovegLengthiness.innerText = 'Lengthiness: ' + asdf[i].lengthiness;
      szovegModel.innerText = 'Model: ' + asdf[i].model;
      szovegCostInCredits.innerText = 'Cost in credits: ' + asdf[i].cost_in_credits;
      szovegManufacturer.innerText = 'Manufacturer: ' + asdf[i].manufacturer;
    }
  }
  //fillScreen(consNullTorlolve);

  function kereses() {
    var array;
    var value = document.getElementById('search-text').value;
    for (let i = 0; i < sort.length; i++) {
      if (sort[i].model.toString().toLowerCase().indexOf(value.toLowerCase()) > -1) {
        array = sort[i];
        break;
      } else {
        array = 'No result!';
      }
    }
    console.log(kereses('fds'));

  }

  getData('/json/spaceships.json', successAjax);