

const lstm = new ml5.charRNN('./models/25000-corpus/', modelReady);

let textInput;
let tempSlider;
let lengthSlider;

function modelReady() {
  // select('#status').html('Model Loaded');
  console.log("GO");
}

function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');

  // Run generate anytime something changes
  textInput.input(generate);
  lengthSlider.input(generate);
  tempSlider.input(generate);
}

function generate() {
  // Update the status log
  select('#status').html('Generating...');

  // Update the length and temperature span elements
  select('#length').html(lengthSlider.value());
  select('#temperature').html(tempSlider.value());

  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();

  // Check if there's something
  if (txt.length > 0) {
    // Here is the data for the LSTM generator
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    // Generate text with the lstm
    lstm.generate(data, (err,result)=>{
      // Update the DOM elements with typed and generated text
      select('#status').html('Ready!');
      select('#original').html(original);
      console.log(result);
      select('#prediction').html(result["sample"]);
    });
  } else {
    // Clear everything
    select('#original').html('');
    select('#prediction').html('');
  }

}


function keyPressed() {
  if (keyCode === TAB) {
      select('#original').html('');
      select('#prediction').html('');
    }
}