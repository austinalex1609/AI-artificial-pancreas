// ai_model.js
let model;

// Build & “train” a simple linear model in memory
async function loadModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({units: 1, inputShape: [1]}));
  model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

  // Dummy training data: [input → glucose change]
  const xs = tf.tensor2d([50, 100, 150, 200, 250], [5,1]);
  const ys = tf.tensor2d([30,  80, 120, 170, 210], [5,1]);
  await model.fit(xs, ys, {epochs: 50});
}

// Given a new sugar input, predict glucose level
async function predictGlucose(inputValue) {
  const input = tf.tensor2d([inputValue], [1,1]);
  const output = model.predict(input);
  const result = (await output.data())[0];
  return result;
}