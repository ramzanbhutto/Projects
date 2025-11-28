var current = "";
var previous = "";
var operation = null;

function update() {
  document.getElementById("result").value = current;
}

function seven() { current += "7"; update(); }
function eight() { current += "8"; update(); }
function nine() { current += "9"; update(); }
function four() { current += "4"; update(); }
function five() { current += "5"; update(); }
function six() { current += "6"; update(); }
function one() { current += "1"; update(); }
function two() { current += "2"; update(); }
function three() { current += "3"; update(); }
function zero() { current += "0"; update(); }

function add() { setOperation("+"); }
function subtract() { setOperation("-"); }
function multiply() { setOperation("*"); }
function divide() { setOperation("/"); }

function setOperation(op) {
  if (current === "") return;
  if (previous !== "") equal();
  operation = op;
  previous = current;
  current = "";
  update();
}

function equal() {
  if (operation === null || current === "") return;
  var prev = +previous;
  var curr = +current;

  var result;
  if (operation === "+") result = prev + curr;
  else if (operation === "-") result = prev - curr;
  else if (operation === "*") result = prev * curr;
  else if (operation === "/") result = prev / curr;

  current = result;
  operation = null;
  previous = "";
  update();
}

function clearResult() {
  current = "";
  previous = "";
  operation = null;
  update();
}
