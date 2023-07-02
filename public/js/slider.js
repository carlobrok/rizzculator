const selectableImages = document.querySelectorAll('.selectable-image');

selectableImages.forEach((image) => {
  const input = image.querySelector('input[type="radio"]');

  if (input.checked) {
    image.style.backgroundColor = 'rgb(196, 65, 51)';
  }

  input.addEventListener('change', () => {
    selectableImages.forEach((otherImage) => {
      otherImage.style.backgroundColor = '';
    });

    if (input.checked) {
      image.style.backgroundColor = 'rgb(196, 65, 51)';
    }
  });
});


const ageSlider = document.querySelector('input[name="age"]');
const ageValue = document.getElementById('ageValue');

// Update the slider value on input event
ageSlider.addEventListener('input', () => {
  ageValue.textContent = ageSlider.value;
});

// Set the initial value of the slider
ageValue.textContent = ageSlider.value;


const incomeSlider = document.querySelector('input[name="income"]');
const incomeValue = document.getElementById('incomeValue');

incomeSlider.addEventListener('input', () => {
  incomeValue.textContent = incomeSlider.value + " €";
});

incomeValue.textContent = incomeSlider.value + " €";

const heightSlider = document.querySelector('input[name="height"]');
const heightValue = document.getElementById('heightValue');

heightSlider.addEventListener('input', () => {
  heightValue.textContent = heightSlider.value + " cm";
});

heightValue.textContent = heightSlider.value + " cm";

const weightSlider = document.querySelector('input[name="weight"]');
const weightValue = document.getElementById('weightValue');

weightSlider.addEventListener('input', () => {
  weightValue.textContent = weightSlider.value + " kg";
});

weightValue.textContent = weightSlider.value + " kg";
