'use strict'

// --------------------------- Global Variables ---------------------------//
const tally = document.getElementById('tally')
const results = document.getElementById('results')
const D = document.getElementById('D')
const prodEh2 = document.getElementById('prodEh2')
const prodEimg = document.getElementById('prodEimg')
const prodFh2 = document.getElementById('prodFh2')
const prodFimg = document.getElementById('prodFimg')
const prodGh2 = document.getElementById('prodGh2')
const prodGimg = document.getElementById('prodGimg')

let voteCounter = 0;

let leftPic = null;
let middlePic = null;
let rightPic = null;

function Product(name, imgPath, times, votes) {
  this.name = name;
  this.imgPath = imgPath;
  this.times = times;
  this.votes = votes;

  Product.allProducts.push(this);
}

Product.allProducts = [];

// --------------------------- Prototype Methods ---------------------------//
Product.prototype.renderProduct = function (h2, imageTag) {
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

function renderThreeImages(productOne, productTwo, productThree) {
  productOne.renderProduct(prodEh2, prodEimg);
  productTwo.renderProduct(prodFh2, prodFimg);
  productThree.renderProduct(prodGh2, prodGimg);
}

function pickProducts() {
  const productOneIndex = Math.floor(Math.random() * Product.allProducts.length);
  let productTwoIndex;
  while (productTwoIndex === undefined || productTwoIndex === productOneIndex) {
    productTwoIndex = Math.floor(Math.random() * Product.allProducts.length);
  }
  let productThreeIndex;
  while (productThreeIndex === undefined || productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex) {
    productThreeIndex = Math.floor(Math.random() * Product.allProducts.length);
  }
  leftPic = Product.allProducts[productOneIndex];
  middlePic = Product.allProducts[productTwoIndex];
  rightPic = Product.allProducts[productThreeIndex];
  leftPic.times++;
  middlePic.times++;
  rightPic.times++;
}

function renderResults() {
  results.innerHTML = '';
  const h2Elem = document.createElement('h2')
  h2Elem.textContent = 'Results:';
  results.appendChild(h2Elem);
  for (let product of Product.allProducts) {
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name} had ${product.votes} votes, with a total of ${product.times} views`;
    results.appendChild(liElem);
  }
}

const displayProduct = function (name, imgPath, times, votes) {
  new Product(name, imgPath, times, votes);
}

function makeButton() {
  const button = document.createElement('button');
  button.addEventListener('click', displayResults)
  button.textContent = 'View Results';
  tally.appendChild(button);
}

// LOCAL STORAGE //


function updateStorage() {
  console.log(Product.allProducts);
  const stringifiedProducts = JSON.stringify(Product.allProducts);
  localStorage.setItem('products', stringifiedProducts);
}

function getStuffOut() {

  let productsFromStorage = localStorage.getItem('products');
  if (productsFromStorage) {
    let parsedProducts = JSON.parse(productsFromStorage);
    console.log(parsedProducts, 'Test');
    for (let products of parsedProducts) {
      displayProduct(products.name, products.imgPath, products.times, products.votes);
    }
  } else {
    new Product('R2D2 Bag', './img/bag.jpeg', 0, 0);
    new Product('Banana Cutter', './img/banana.jpeg', 0, 0);
    new Product('iPAD Toilet Paper Holder', './img/bathroom.jpeg', 0, 0);
    new Product('Toeless Rainboots', './img/boots.jpeg', 0, 0);
    new Product('Ultimate Breakfast', './img/breakfast.jpeg', 0, 0);
    new Product('Meatball Bubble Gum', './img/bubblegum.jpeg', 0, 0);
    new Product('Reverse Chair', './img/chair.jpeg', 0, 0);
    new Product('Cthulhu Sleeps', './img/cthulhu.jpeg', 0, 0);
    new Product('Dog Beak', './img/dog-duck.jpeg', 0, 0);
    new Product('Can of Dragon Meat', './img/dragon.jpeg', 0, 0);
    new Product('Pen x Plastic Silverware', './img/pen.jpeg', 0, 0);
    new Product('Pet Sweep', './img/pet-sweep.jpeg', 0, 0);
    new Product('Pizza Scissors', './img/scissors.jpeg', 0, 0);
    new Product('Shark Mummy Bag', './img/shark.jpeg', 0, 0);
    new Product('Swiss Baby', './img/sweep.png', 0, 0);
    new Product('Tauntaun Sleeping Bag', './img/tauntaun.jpeg', 0, 0);
    new Product('Unicorn Meat', './img/unicorn.jpeg', 0, 0);
    new Product('Inception Spout', './img/water-can.jpeg', 0, 0);
    new Product('Spill-less Wine Glass', './img/wine-glass.jpeg', 0, 0);
  }
}

// LOCAL STORAGE //

function handleClick(e) {
  console.log('working')
  let clickedItem = e.target;
  console.log(clickedItem);
  if (voteCounter < 25) {
    if (clickedItem === prodEimg || clickedItem === prodFimg || clickedItem === prodGimg) {
      voteCounter++;
      if (clickedItem === prodEimg) {
        leftPic.votes++;
      } else if (clickedItem === prodFimg) {
        middlePic.votes++;
      } else {
        rightPic.votes++;
      }
      pickProducts();

      renderThreeImages(leftPic, middlePic, rightPic)
    } else {
      alert('Please click an image.')
    }
  } else {
    D.removeEventListener('click', handleClick);
    // renderResults();
    updateStorage();
    makeButton();
  }
}

function displayResults() {
  renderResults();
  callChart();
  tally.removeEventListener('click', displayResults)
}

D.addEventListener('click', handleClick)


getStuffOut();
pickProducts();
console.log(leftPic);
console.log(middlePic);
console.log(rightPic);
renderThreeImages(leftPic, middlePic, rightPic);

// Chart //

var graph = document.getElementById('chart').getContext('2d');
// Global var


// console.log(voteArray);
// Move with other funcitons
function callChart() {
  var nameArray = [];
  var voteArray = [];
  for (let item of Product.allProducts) {

    nameArray.push(item.name);
    voteArray.push(item.votes);

  }
  var myChart = new Chart(graph, {

    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [{
        label: '# of Votes',
        data: voteArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// getStuffOut();
// pickProducts();
// renderThreeImages();