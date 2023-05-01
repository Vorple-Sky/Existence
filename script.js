let colors = ['bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4'];
let currentIndex = 0;
let bodyElement = document.getElementsByTagName('body')[0];

function changeBackgroundColor() {
  bodyElement.className = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeBackgroundColor, 4000);

const nextButton = document.createElement('button');

// setting button text
nextButton.innerText = 'Next Page';


nextButton.addEventListener('click', function() {
  // add code for what should happen when the button is clicked
});

// add the button to the page
document.body.appendChild(nextButton);


