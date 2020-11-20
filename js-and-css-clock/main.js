const app = (function() {
  return {
    init: function init() {
      setInterval(this.currentTime, 1000);
    },
    
    currentTime: function currentTime() {
      const now = new Date();
      
      const secondsHand = document.querySelector('.seconds');
      const minuteHand = document.querySelector('.minute');
      const hourHand = document.querySelector('.hour');
      
      const seconds = now.getSeconds();
      const minute = now.getMinutes();
      const hour = now.getHours();
      
      secondsHand.style.transform = `translate(20px, 20px) rotate(calc(${seconds} * 6deg))`;
      minuteHand.style.transform = `translate(20px, 20px) rotate(calc(${minute} * 6deg))`;
      hourHand.style.transform = `translate(20px, 20px) rotate(calc(${hour} * 30deg))`;
    }
  };
})();

app.init();