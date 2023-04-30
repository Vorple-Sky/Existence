const nounForm = document.querySelector('#noun-form');
const output = document.querySelector('#output');

nounForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const noun1 = document.querySelector('#noun-1').value;
  const noun2 = document.querySelector('#noun-2').value;
  const noun3 = document.querySelector('#noun-3').value;
  const noun4 = document.querySelector('#noun-4').value;
  const noun5 = document.querySelector('#noun-5').value;
  const sentence = `The ${noun1}, ${noun2}, ${noun3}, ${noun4}, and ${noun5}.`;
  output.textContent = sentence;
});
