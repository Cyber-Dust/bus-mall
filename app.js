'use strict'

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

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.shown = 0;
  this.votes = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];

Product.prototype.renderProduct = function(h2, imageTag) {
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

function renderThreeProducts(productOne, productTwo, productThree) {
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
  leftPic.shown++;
  middlePic.shown++;
  rightPic.shown++;
}

function renderResults() {
  results.innerHTML = '';
  const h2Elem = document.createElement('h2')
  h2Elem.textContent = 'Results';
  results.appendChild(h2Elem);
  for (let product of Product.allProducts) {
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name} recieved ${product.votes} votes after ${product.shown} showings`;
    results.appendChild(liElem);
  }
}

function makeButton() {
  const button = document.createElement('button');
  button.addEventListener('click', displayResults)
  button.textContent = 'View tally';
  tally.appendChild(button);
}

function handleClick(e) {
  console.log('working')
  let clickedItem = e.target;
  console.log(clickedItem);
  if (voteCounter < 5) {
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
      renderThreeProducts(leftPic, middlePic, rightPic)
    } else {
      alert('Please click an image.')
    }
  } else {
      D.removeEventListener('click', handleClick);
      // renderResults();
      makeButton();
  }
}

function displayResults() {
  renderResults();
  tally.removeEventListener('click', displayResults)
}

D.addEventListener('click', handleClick)

new Product('R2D2 Bag', './img/bag.jpeg' );
new Product('Banana Cutter', './img/banana.jpeg');
new Product('Toilet Paper Holder', './img/bathroom.jpeg');
new Product('Rainboots', './img/boots.jpeg');
new Product('Breakfast Maker', './img/breakfast.jpeg');
new Product('Meatball Bubble Gum', './img/bubblegum.jpeg');
new Product('Uncomfortable Chair', './img/chair.jpeg');
new Product('Cthulhu Action Figure', './img/cthulhu.jpeg');
new Product('Dog Duck Beak!', './img/dog-duck.jpeg');
new Product('Dragon Meat', './img/dragon.jpeg');
new Product('Pen Untensils', './img/pen.jpeg');
new Product('Pet Sweep', './img/pet-sweep.jpeg');
new Product('Pizza Scissors', './img/scissors.jpeg');
new Product('Sleeping Shark', './img/shark.jpeg');
new Product('Baby Sweep', './img/sweep.png');
new Product('Tauntaun Sleeping Bag', './img/tauntaun.jpeg');
new Product('Unicorn Meat', './img/unicorn.jpeg');
new Product('Self-watering Can', './img/water-can.jpeg');
new Product('No Spill Wine Glass', './img/wine-glass.jpeg');

pickProducts();
console.log(leftPic);
console.log(middlePic);
console.log(rightPic);
renderThreeProducts(leftPic, middlePic, rightPic);
