var current = "";
var previous = "";
var operation = null;

function update(){
  var out = document.getElementById("result");
  if (!out) return;
  // Show 0 when empty to improve UX
  out.value = (current === "" || current === null || current === undefined) ? "0" : String(current);
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

function setOperation(op){
  if (current === "") return;
  if (previous !== "") equal();
  operation = op;
  previous = current;
  current = "";
  update();
}

function equal(){
  if(operation === null || current === "") return;
  var prev = Number(previous);
  var curr = Number(current);

  var result;
  if(operation === "+") result = prev + curr;
  else if(operation === "-") result = prev - curr;
  else if(operation === "*") result = prev * curr;
  else if(operation === "/"){
    if(curr === 0){
      result = "Error"; // division by zero
    } 
    else{
      result = prev / curr;
    }
  }

  // Normalize result for display
  if(typeof result === "number"){
    if(!Number.isFinite(result) || Number.isNaN(result)){
      current = "Error";
    }
    else{
      current = (Math.round((result + Number.EPSILON) * 1e12) / 1e12).toString();
    }
  } 
  else{
    current = String(result);
  }

  operation = null;
  previous = "";
  update();
}

function clearResult(){
  current = "";
  previous = "";
  operation = null;
  update();
}

// initialize display on load
update();
