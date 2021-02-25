const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteBtn = document.querySelector('.delete-items');
const checkBtn = document.querySelector('.check-items');
const uncheckBtn = document.querySelector('.uncheck-items');

function addPlate(e) {
  e.preventDefault();
  
  const name = (this.querySelector('[name="item"]')).value;
  const item = {
    name,
    done: false
  };
  
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  if (plates.length > 0) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''}>
          <label for="item${i}">${plate.name}</label>
        </li>
      `
    }).join('');
  } else {
    platesList.innerHTML = '<li>Add an item</li>';
  }
}

function toggleDone(e) {
  if (!e.target.matches('input')) 
    return;
  
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  
  populateList(items, itemsList);
}

function clearList() {
  localStorage.removeItem('items');
  while (items.length) {
    items.pop();
  }
  
  populateList(items, itemsList);
}

function checkAll(checkedValue) {
  items.forEach(item => {
    item.done = checkedValue;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  });
}

addItems.addEventListener('submit', addPlate);
itemsList.addEventListener('click', toggleDone);
deleteBtn.addEventListener('click', clearList);
checkBtn.addEventListener('click', () => checkAll(true));
uncheckBtn.addEventListener('click', () => checkAll(false));

populateList(items, itemsList);