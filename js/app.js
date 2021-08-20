"use strict";

let clicks = 0;
let clickLimit = 25;
let itemsDisplayed =[];

var Item = function(name, fileType, descr) {
  this.name = name;
  this.fileType = fileType;
  this.timeClicked = 0;
  this.descr = descr;
  this.timesDisplayed = 0;
  this.src = `./img/${name}.${fileType}`
}

let items = [
  new Item("bag", "jpg", "R2D2 Rolling travel bag"),
  new Item("banana", "jpg", "Banana slicing tool for cutting bananas into slices"),
  new Item("bathroom", "jpg", "iPad and toilet paper holding stand"),
  new Item("breakfast", "jpg", "Open toe rain boots"),
  new Item("bubblegum", "jpg", "Open toe rain boots"),
  new Item("chair", "jpg", "Open toe rain boots"),
  new Item("cthulhu", "jpg", "Open toe rain boots"),
  new Item("dog-duck", "jpg", "Open toe rain boots"),
  new Item("dragon", "jpg", "Open toe rain boots"),
  new Item("pen", "jpg", "Open toe rain boots"),
  new Item("pet-sweep", "jpg", "Open toe rain boots"),
  new Item("scissors", "jpg", "Open toe rain boots"),
  new Item("shark", "jpg", "Open toe rain boots"),
  new Item("sweep", "png", "Open toe rain boots"),
  new Item("tauntaun", "jpg", "Open toe rain boots"),
  new Item("unicorn", "jpg", "Open toe rain boots"),
  new Item("water-can", "jpg", "Open toe rain boots"),
  new Item("wine-glass", "jpg", "Open toe rain boots"),  
]

function rendorItem(src, elementID, descr) {
  let element = document.getElementById(`${elementID}`);
  let image = document.createElement('img');
  image.setAttribute("src", `${src}`);
  image.setAttribute("alt", `${descr}`);
  element.appendChild(image);
}

function rendorThreeItems(arr) {
  while (itemsDisplayed.length < 6) {
    let num = Math.floor(Math.random() * (arr.length - 1));
    if (!itemsDisplayed.includes(num)) {
      itemsDisplayed.push(num);
    }
  };
  console.log(itemsDisplayed);

  let leftItemIndex = itemsDisplayed[0];
  let middleItemIndex = itemsDisplayed[1];
  let rightItemIndex = itemsDisplayed[2];

  rendorItem(items[leftItemIndex].src, 'left-item', items[leftItemIndex].descr);
  rendorItem(items[middleItemIndex].src, 'middle-item', items[middleItemIndex].descr);
  rendorItem(items[rightItemIndex].src, 'right-item', items[rightItemIndex].descr);

  items[leftItemIndex].timesDisplayed++;
  items[middleItemIndex].timesDisplayed++;
  items[rightItemIndex].timesDisplayed++;

}

rendorThreeItems(items);

function clearContentByID(elementID) {
  let element = document.getElementById(`${elementID}`);
  element.innerHTML='';
}

function removeEventListeners () {
    leftItemDisplayed.removeEventListener('click', pickLeft);
    middleItemDisplayed.removeEventListener('click', pickMiddle);
    rightItemDisplayed.removeEventListener('click', pickRight);
}

function pickRendor(item){
  item.timeClicked += 1;
  clicks += 1;
  clearContentByID('left-item');
  clearContentByID('middle-item');
  clearContentByID('right-item');
  rendorThreeItems(items);
  if (clicks === clickLimit) {
    removeEventListeners();
    renderChart();
  }
}

let leftItemDisplayed = document.getElementById('left-item');
let middleItemDisplayed = document.getElementById('middle-item');
let rightItemDisplayed = document.getElementById('right-item');


let pickLeft = function (event) {
  itemsDisplayed.shift();
  itemsDisplayed.shift();
  itemsDisplayed.shift();
  pickRendor(items[itemsDisplayed[0]]);
  console.log('shifted')
}

let pickRight = function (event) {
  itemsDisplayed.shift();
  itemsDisplayed.shift();
  itemsDisplayed.shift();
  pickRendor(items[itemsDisplayed[2]]);
  
}

let pickMiddle = function (event) {
  itemsDisplayed.shift();
  itemsDisplayed.shift();
  itemsDisplayed.shift();
  pickRendor(items[itemsDisplayed[1]]);
}

// let showResults = function (event) {
//   let resultsParent = document.getElementById('results');
//   let list = document.createElement('ul');
//   for (let i=0; i < items.length; i++) {
//     let listItem = document.createElement('li');
//     listItem.textContent = `${items[i].name} had ${items[i].timeClicked}, and was seen ${items[i].timesDisplayed} times.`;
//     list.appendChild(listItem);
//   };
//   resultsParent.appendChild(list);
//   let button = document.querySelector('button');
//   button.removeEventListener('click', showResults);
// }

leftItemDisplayed.addEventListener('click', pickLeft);
middleItemDisplayed.addEventListener('click', pickMiddle);
rightItemDisplayed.addEventListener('click', pickRight);

function renderChart() {
  let itemClicks = [];
  let itemViews = [];
  let itemNames = [];
  for (let i = 0; i < items.length; i++) {
    itemNames.push(items[i].name);
    itemClicks.push(items[i].timeClicked);
    itemViews.push(items[i].timesDisplayed);
  }
  let chartObject = {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: '# of Views',
        data: itemViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: itemClicks,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}