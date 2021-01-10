const app = (function () {
  return {
    init: function init() {
      const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
      const cities = [];
      
      fetch(endpoint).then(response => response.json()).then(data => cities.push(...data));
      
      this.getSearch(cities);
    },
    
    findResults: function findResults(search, cities) {
      return cities.filter(place => {
        const regex = new RegExp(search, 'gi');
          
        return place.city.match(regex) || place.state.match(regex);
      });
    },
      
    numberWithCommas: function numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
      
    displayResult: function displayResult(search, cities) {
      const suggestions = document.querySelector('.suggestions');
      const result = app.findResults(search, cities);
      
      const html = result.map(place => {
        const regex = new RegExp(search, 'gi');
        const city = place.city.replace(regex, `<span class="hl">${search}</span>`);
        const state = place.state.replace(regex, `<span class="hl">${search}</span>`);
          
        return `
          <li>
            <span class="name">${city}, ${state}</span>
            <span class="population">${app.numberWithCommas(place.population)}</span>
          </li>
        `;
      }).join('');
      
      suggestions.innerHTML = html;
          
      if(!search)
        suggestions.innerHTML = '<li>ex: Boston</li><li>or Massachusetts</li>';
    },
    
    getSearch: function getSearch(cities) {
      const input = document.querySelector('.search');
      
      function handleKeyUp() {
        return app.displayResult(this.value, cities);
      }

      input.addEventListener('keyup', handleKeyUp);
    }
  };
})();

app.init();