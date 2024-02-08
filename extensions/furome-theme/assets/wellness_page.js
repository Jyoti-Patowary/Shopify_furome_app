document.addEventListener("DOMContentLoaded", function() {
  const xValues = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const yValues = ["Optimal", "Non-optimal"];
  const data = [8, 7, 9, 8, 10, 9]; // Replace with your actual data

  const colors = {
    "Optimal": "rgba(0, 255, 0, 1.0)", // Light green
    "Non-optimal": "rgba(255, 0, 0, 1.0)" // Red
  };

  const datasets = yValues.map(label => ({
    backgroundColor: colors[label],
    data: data[yValues.indexOf(label)],
    label: label
  }));

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: datasets
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
});
