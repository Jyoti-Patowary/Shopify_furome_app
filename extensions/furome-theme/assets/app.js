document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const reportID = urlParams.get('report_id');

  console.log("Report ID:", reportID);

  if (reportID !== null) {
    try {
      const reportCollectionRef = collection(db, "report");
      const querySnapshot = await getDocs(reportCollectionRef);

      let reportFound = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.report_id === reportID) {
          reportFound = true;
          document.querySelector('.profile-name h3').textContent = data.header || 'Header not available';
          document.querySelector('.profile-name p').textContent = data.button || 'Button text not available';
          document.querySelector('.summary-text p').innerHTML = data.summary || 'Summary not available';
          document.querySelector('.pt-3').innerHTML = data.recommendations || 'Click here to see recommendations';
          document.querySelector('.accordion-body').innerHTML = data.disclaimer || 'Disclaimer not available';
          document.getElementById('profile-C').src = data.image || 'default_image_url';



          const wellnessElement = document.querySelector('#wellness');
          wellnessElement.addEventListener('click', function() {
            if (reportID) {
              const url = `/pages/metabolites?report_id=${reportID}`;
              // window.open(url, '_blank');
              window.location.href = url;
            } else {
              console.log('No report ID available to fetch metabolites.');
            }
          });

          const diseaseElement = document.getElementById('disease');
          diseaseElement.addEventListener('click', function () {
            if (reportID) {
              const url = `/pages/wellness?report_id=${reportID}`;
              window.location.href = url; 
            } else {
              console.log('No report ID available to fetch wellness data.');
            }
          });
        }
      });

      if (!reportFound) {
        console.log('Report not found.');
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  } else {
    console.log("Report ID is null. Ensure that the URL contains the report_id parameter.");
  }
});





//  document.addEventListener("DOMContentLoaded", function () {
//   const filterIcon = document.getElementById("filterIcon");
//   const sortableList = document.getElementById("sortableList");

//   // Simulated data (replace this with your actual data retrieval code)
//   const dataFromDatabase = [
//     { status: "Optimal", progress: 70, disease: "Healthy" },
//     { status: "Non-Optimal", progress: 40, disease: "Injured" },
//     { status: "Optimal", progress: 60, disease: "Healthy" },
//     { status: "Non-Optimal", progress: 10, disease: "Injured" },
//     { status: "Optimal", progress: 40, disease: "Healthy" },
//     { status: "Non-Optimal", progress: 90, disease: "Injured" },
//     { status: "Optimal", progress: 90, disease: "Healthy" },
//     { status: "Non-Optimal", progress: 16, disease: "Injured" },
//     { status: "Optimal", progress: 70, disease: "Healthy" },
//     { status: "Non-Optimal", progress: 40, disease: "Injured" },
//     { status: "Optimal", progress: 70, disease: "Healthy" },
//     { status: "Non-Optimal", progress: 40, disease: "Injured" },
//     { status: "Non-Optimal", progress: 40, disease: "Injured" },
//   ];

//   function sortListAscending() {
//     const listItems = Array.from(sortableList.querySelectorAll("li"));

//     listItems.sort((a, b) => {
//       const progressA = parseInt(a.querySelector(".progress").style.width);
//       const progressB = parseInt(b.querySelector(".progress").style.width);
//       return progressA - progressB;
//     });

//     // Clear the existing list
//     while (sortableList.firstChild) {
//       sortableList.removeChild(sortableList.firstChild);
//     }

//     // Append the sorted list items
//     listItems.forEach((item) => {
//       sortableList.appendChild(item);
//     });
//   }

//   // Function to sort the list by progress in descending order
//   function sortListDescending() {
//     const listItems = Array.from(sortableList.querySelectorAll("li"));

//     listItems.sort((a, b) => {
//       const progressA = parseInt(a.querySelector(".progress").style.width);
//       const progressB = parseInt(b.querySelector(".progress").style.width);
//       return progressB - progressA;
//     });

//     // Clear the existing list
//     while (sortableList.firstChild) {
//       sortableList.removeChild(sortableList.firstChild);
//     }

//     // Append the sorted list items
//     listItems.forEach((item) => {
//       sortableList.appendChild(item);
//     });
//   }

//   // Initial sort order (ascending)
//   let ascendingSort = true;

//   filterIcon.addEventListener("click", function () {
//     if (ascendingSort) {
//       sortListDescending(); // Sort in descending order
//     } else {
//       sortListAscending(); // Sort in ascending order
//     }

//     ascendingSort = !ascendingSort; // Toggle sort order
//   });

//   // Generate list items based on data from the database
//   dataFromDatabase.forEach((itemData) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <p class="tooltip">${itemData.status}</p>
//       <div class="progress-bar">
//         <div class="progress" style="width: ${itemData.progress}%;"></div>
//       </div>
//       <p class="disease">${itemData.disease}</p>
//     `;

//     sortableList.appendChild(li);
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const toggleDisclaimer = document.getElementById("toggleDisclaimer");
//   const disclaimerContent = document.getElementById("disclaimerContent");

//   toggleDisclaimer.addEventListener("click", function () {
//     disclaimerContent.classList.toggle("hidden");
//   });
// });




