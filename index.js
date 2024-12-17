const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],  // Empty labels initially
    datasets: [{
      label: '# of Subscribers in 2024',
      data: [],  // Empty data initially
      borderWidth: 2,
      borderColor: 'rgb(255,0,0)',  // Line color (e.g., red)
      backgroundColor: 'rgba(255,0,0,40)',  // Line fill color (optional)
      pointBackgroundColor: 'rgba(255,0,0,80)',  // Point color
      pointBorderColor: 'rgb(255,0,0)'  // Point border color
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,

        ticks: {
            // Custom tick callback to append " C°" to each tick value
            callback: function(value) {
              return value + 'M';  // Add " C°" to each tick value
            },
            stepSize: 50
        }
      }
    }
  }
});

// Fetch and process CSV data asynchronously
async function getData() {
  const response = await fetch("youtube_subscribers_data.csv");
  const data = await response.text();
  const rows = data.split("\n").slice(1); // Skip header row
  
  // Prepare arrays for chart data
  const labels = [];
  const values = [];

  // Loop through each row and extract relevant data
  rows.forEach(row => {
    const columns = row.split(",");  // Assuming CSV is comma-separated

    if (columns.length > 1) {
      labels.push(columns[0]);  // Assuming the first column is the label
      values.push((parseFloat(columns[2])));  // Assuming the second column is numeric

    }
  });

  // Update the chart with the parsed data
  myChart.data.labels = labels;
  myChart.data.datasets[0].data = values;

  // Re-render the chart with updated data
  myChart.update();
}

// Call the getData function when the page loads
getData();
