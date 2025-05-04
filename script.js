function checkGlucose() {
  const glucose = parseFloat(document.getElementById('glucoseInput').value);
  const result = document.getElementById('resultMessage');

  if (isNaN(glucose)) {
    result.textContent = "Please enter a valid number.";
    result.style.color = "red";
    return;
  }

  if (glucose < 70) {
    result.textContent = "Low blood sugar! Consume 15g of fast-acting carbs (e.g., juice, glucose tablets).";
    result.style.color = "orange";
  } else if (glucose > 180) {
    result.textContent = "High blood sugar! Consider taking insulin or light exercise. Monitor closely.";
    result.style.color = "red";
  } else {
    result.textContent = "Blood sugar is in a normal range. Continue your current routine.";
    result.style.color = "green";
  }
}
