const checkboxes = Array.from(document.querySelectorAll('.inbox input[type="checkbox"]'));
let checked;
let lastChecked;

function handleCheck(e) {
  checked = checkboxes.indexOf(this);
  
  if (e.shiftKey && this.checked) {
    lastChecked = checkboxes.indexOf(this);
    
    const checkboxesSelected = checkboxes.slice(checked, lastChecked);
    
    checkboxesSelected.forEach(selected => selected.checked);
  }
}

checkboxes.forEach(checkboxe => checkboxe.addEventListener('click', handleCheck));