var rangeslider1 = document.getElementById("1SliderRange");
var rangeslider2 = document.getElementById("2SliderRange");
var output = document.getElementById("demo");
var output2 = document.getElementById("demo2");
output.innerHTML = rangeslider1.value;
output2.innerHTML = rangeslider2.value;


rangeslider1.oninput = function() {
  output.innerHTML = this.value;
  
}
rangeslider2.oninput = function() {
  output2.innerHTML = this.value;

}

