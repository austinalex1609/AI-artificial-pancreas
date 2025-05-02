// script.js
let chart;

window.addEventListener('DOMContentLoaded', async () => {
  await loadModel();

  const ctx = document.getElementById('glucoseChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Predicted Glucose', data: [], fill: false, tension: 0.3 }] },
    options: {
      scales: {
        x: { title: { display: true, text: 'Step' } },
        y: { title: { display: true, text: 'Glucose (mg/dL)' } }
      }
    }
  });

  document.getElementById('simulateBtn').onclick = simulate;
});

async function simulate() {
  const inputVal = +document.getElementById('sugarInput').value;
  const pred = await predictGlucose(inputVal);
  const last = chart.data.datasets[0].data.slice(-1)[0] || inputVal;
  const diff = pred - last;

  // Update chart
  const step = chart.data.labels.length + 1;
  chart.data.labels.push(step);
  chart.data.datasets[0].data.push(pred.toFixed(1));
  chart.update();

  // Show result
  const resultEl = document.getElementById('result');
  const suggestEl = document.getElementById('suggestions');
  if (diff > 0) {
    resultEl.textContent = `Spike detected: +${diff.toFixed(1)} mg/dL`;
    suggestEl.innerHTML = `
      <p><strong>Suggestions for Spike:</strong></p>
      <p>• Take a small dose of fast‑acting insulin if prescribed.</p>
      <p>• Consider going for a short walk to help lower it.</p>
      <p>• Avoid high‑GI snacks immediately.</p>
    `;
  } else {
    resultEl.textContent = `Drop detected: ${diff.toFixed(1)} mg/dL`;
    suggestEl.innerHTML = `
      <p><strong>Suggestions for Drop:</strong></p>
      <p>• Consume 15g of fast‑acting carbohydrates (juice, glucose tabs).</p>
      <p>• Recheck after 15 minutes.</p>
      <p>• Keep a small snack handy to stabilize levels.</p>
    `;
  }
}