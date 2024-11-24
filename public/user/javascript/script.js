let filterItem = document.querySelector('.items-links');
let fileteImages = document.querySelectorAll('.gallery-img');

window.addEventListener('load', () => {
 filterItem.addEventListener('click', (selectedItem) => {
  if (selectedItem.target.classList.contains('item-link')) {
   document.querySelector('.menu-active').classList.remove('menu-active');
   selectedItem.target.classList.add('menu-active');
   let filterName = selectedItem.target.getAttribute('data-name');
   fileteImages.forEach((image) => {
    let fileteImages = image.getAttribute('data-name');

    if ((fileteImages == filterName) || filterName == 'All') {
     image.style.display = 'block';
    }
    else {
     image.style.display = 'none';
    }
   })
  }
 })
})



