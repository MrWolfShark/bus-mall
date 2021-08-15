"use strict";

let clicks = 0;
let clickLimit = 25;
let leftItem = null;
let middleItem = null;
let rightItem = null;

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
  leftItem = arr[Math.floor(Math.random() * (arr.length - 1))]
  middleItem = arr[Math.floor(Math.random() * (arr.length - 1))]
  rightItem = arr[Math.floor(Math.random() * (arr.length - 1))]
  while (
    leftItem.name === middleItem.name || rightItem.name === leftItem.name || rightItem.name === middleItem.name
  ) { 
    middleItem = arr[Math.floor(Math.random() * (arr.length - 1))];
    rightItem = arr[Math.floor(Math.random() * (arr.length - 1))];
  };

  leftItem.timesDisplayed += 1;
  middleItem.timesDisplayed += 1;
  rightItem.timesDisplayed += 1;

  rendorItem(middleItem.src, 'middle-item', middleItem.descr)
  rendorItem(leftItem.src, 'left-item', leftItem.descr)
  rendorItem(rightItem.src, 'right-item', rightItem.descr)
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

function createButtonInElementID (elementID, buttonTxt) {
  let element = document.getElementById(elementID);
  let button = document.createElement('button');
  button.setAttribute('type', 'click');
  button.textContent = buttonTxt;
  element.appendChild(button);
  addButtonListener();
}

function addButtonListener () {
  let button = document.querySelector('button');
  button.addEventListener('click', showResults);
}

function pickRendor(item){
  item.timeClicked += 1;
  clicks += 1;
  clearContentByID('left-item');
  clearContentByID('middle-item');
  clearContentByID('right-item');
  rendorThreeItems(items);
  if (clicks === clickLimit) {
    removeEventListeners()
    createButtonInElementID('results', 'View Results');
  }
}

let leftItemDisplayed = document.getElementById('left-item');
let middleItemDisplayed = document.getElementById('middle-item');
let rightItemDisplayed = document.getElementById('right-item');


let pickLeft = function (event) {
  pickRendor(leftItem);
}

let pickRight = function (event) {
  pickRendor(rightItem);
}

let pickMiddle = function (event) {
  pickRendor(middleItem);
}

let showResults = function (event) {
  let resultsParent = document.getElementById('results');
  let list = document.createElement('ul');
  for (let i=0; i < items.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${items[i].name} had ${items[i].timeClicked}, and was seen ${items[i].timesDisplayed} times.`;
    list.appendChild(listItem);
  };
  resultsParent.appendChild(list);
  let button = document.querySelector('button');
  button.removeEventListener('click', showResults);
}

leftItemDisplayed.addEventListener('click', pickLeft);
middleItemDisplayed.addEventListener('click', pickMiddle);
rightItemDisplayed.addEventListener('click', pickRight);




