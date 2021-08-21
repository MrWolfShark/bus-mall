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

function createItem(name, fileType, descr) {
  (new Item(name, fileType, descr))
}

function persistArrayData () {
  let stringifiedItems = JSON.stringify(items);
  localStorage.setItem('items', stringifiedItems);
}

if (!localStorage.getItem('items')) {
  let items = [];
  items.push("bag", "jpg", "R2D2 Rolling travel bag")
  items.push("banana", "jpg", "Banana slicing tool for cutting bananas into slices")
  items.push("bathroom", "jpg", "iPad and toilet paper holding stand")
  items.push("breakfast", "jpg", "Open toe rain boots")
  items.push("bubblegum", "jpg", "Open toe rain boots")
  items.push("chair", "jpg", "Open toe rain boots")
  items.push("cthulhu", "jpg", "Open toe rain boots")
  items.push("dog-duck", "jpg", "Open toe rain boots")
  items.push("dragon", "jpg", "Open toe rain boots")
  items.push("pen", "jpg", "Open toe rain boots")
  items.push("pet-sweep", "jpg", "Open toe rain boots")
  items.push("scissors", "jpg", "Open toe rain boots")
  items.push("shark", "jpg", "Open toe rain boots")
  items.push("sweep", "png", "Open toe rain boots")
  items.push("tauntaun", "jpg", "Open toe rain boots")
  items.push("unicorn", "jpg", "Open toe rain boots")
  items.push("water-can", "jpg", "Open toe rain boots")
  items.push("wine-glass", "jpg", "Open toe rain boots")  
} else {
  let storedData = localStorage.getItem('items');
  let parsedData = JSON.parse(storedData);
  console.log(parsedData);
  var items = parsedData;
}

function rendorItem(src, elementID, descr) {
  let element = document.getElementById(`${elementID}`);
  let image = document.createElement('img');
  image.setAttribute("src", `${src}`);
  image.setAttribute("alt", `${descr}`);
  element.appendChild(image);
}

function rendorThreeItems(arr) {
  while (itemsDisplayed.length < 6) {
    let num = Math.floor(Math.random() * (arr.length));
    if (!itemsDisplayed.includes(num)) {
      itemsDisplayed.push(num);
    }
  };

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

leftItemDisplayed.addEventListener('click', pickLeft);
middleItemDisplayed.addEventListener('click', pickMiddle);
rightItemDisplayed.addEventListener('click', pickRight);

function renderChart() {
  let itemClicks = [];
  let itemViews = [];
  let itemNames = [];
  persistArrayData();
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