const xValues = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const storeName = 'quickstart-b37ce774.myshopify.com';
const apiVersion = '2023-10';

const baseUrl = `https://${storeName}/apps/express-proxy`

function resolveUrl(path) {
  return `${baseUrl}${path}`;
}


document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const reportID = urlParams.get('report_id');

  console.log('Report ID:', reportID);

  if (reportID) {
    fetchWellnessData(reportID);
    fetchReportData(reportID);
  } else {
    console.log('No report ID found in the URL.');
  }
});

async function fetchWellnessData(reportID) {
  try {

    let { data: wellnessSnapshot = [] } = await (await fetch(resolveUrl(`/report/wellness/${reportID}`), {
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
    }))?.json();

    displayWellnessData(wellnessSnapshot);
    populateChartWithData(wellnessSnapshot);
  } catch (error) {
    console.error('Error fetching report or wellness data:', error);
  }
}

async function fetchReportData(reportID) {
  try {
    let { data } = await (await fetch(resolveUrl(`/report/${reportID}`), {
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
    }))?.json();
    console.log("data", data)
    document.querySelector('.pt-3').innerHTML = data.recommendations || 'Click here to see recommendations';
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
}

function displayWellnessData(snapshot = []) {
  console.log('Wellness Collection Data:');
  snapshot.map((data) => {
    console.log('Wellness data:', data);
  });
}

function populateChartWithData(wellnessSnapshot) {
  const numericalData = wellnessSnapshot.map((data) => {
    return data.value;
  });

  new Chart('myChart', {
    type: 'line',
    responsive: true,
    data: {
      labels: xValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(0,0,255,1.0)',
          borderColor: 'rgba(0,0,255,0.1)',
          data: numericalData,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { suggestedMin: 0, suggestedMax: 10 } }],
      },
    },
  });
}
