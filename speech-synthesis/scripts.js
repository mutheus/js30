const msg = new SpeechSynthesisUtterance();
const syth = window.speechSynthesis;
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  const voices = syth.getVoices();
  
  voicesDropdown.innerHTML = voices
    .map(voice => `<option name="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

