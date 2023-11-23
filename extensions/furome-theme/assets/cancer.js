const xValues = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    const reportQuery = query(collection(db, 'report'), where('report_id', '==', reportID));
    const reportSnapshot = await getDocs(reportQuery);

    if (!reportSnapshot.empty) {
      const reportDoc = reportSnapshot.docs[0]; // Assuming there's only one document for the provided reportID
      const wellnessRef = collection(reportDoc.ref, 'wellness');
      const wellnessSnapshot = await getDocs(wellnessRef);

      if (!wellnessSnapshot.empty) {
        displayWellnessData(wellnessSnapshot);
        populateChartWithData(wellnessSnapshot);
      } else {
        console.log('No wellness data found for this report.');
      }
    } else {
      console.log('No report with the provided ID found.');
    }
  } catch (error) {
    console.error('Error fetching report or wellness data:', error);
  }
}

async function fetchReportData(reportID) {
  try {
    const reportQuery = query(collection(db, 'report'), where('report_id', '==', reportID));
    const reportSnapshot = await getDocs(reportQuery);

    if (!reportSnapshot.empty) {
      const reportDoc = reportSnapshot.docs[0];
      const data = reportDoc.data();
      console.log("data", data)
      document.querySelector('.pt-3').innerHTML = data.recommendations || 'Click here to see recommendations';
    } else {
      console.log('No report with the provided ID found.');
    }
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
}

function displayWellnessData(snapshot) {
  console.log('Wellness Collection Data:');
  snapshot.forEach((doc) => {
    const data = doc.data();
    console.log('Wellness data:', doc.id, data);
  });
}

function populateChartWithData(wellnessSnapshot) {
  const numericalData = wellnessSnapshot.docs.map((doc) => {
    const data = doc.data();
    return data.value; 
  });

  new Chart('myChart', {
    type: 'line',
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
