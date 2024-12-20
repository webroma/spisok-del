/*let addButton = document.getElementById('addbutton');
let content = document.querySelector('.element')

addButton.addEventListener('click', function (evt)  {
    evt.preventDefault();
    content.classList.toggle('element-hidden');
})*/

document.querySelector('.burger_btn').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-button').classList.toggle('open');
})

