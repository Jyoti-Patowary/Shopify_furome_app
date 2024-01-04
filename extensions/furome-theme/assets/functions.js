// Shopify API Call

// window.onload = function () {
const apiKey = '856f6c386e8c2ad7e66cc0097748cf2a';
const password = 'ef7700fb26f4867d0f23737f549b93a1';
const storeName = 'quickstart-b37ce774.myshopify.com';
const apiVersion = '2023-10';

const baseUrl = `https://${storeName}/apps/express-proxy`
let MODAL_STATE = LOADER_STATE = { HIDE: 'hide', SHOW: 'show' }

function resolveUrl(path) {
  return `${baseUrl}${path}`;
}

function showLoader(status) {
  let loader = document?.getElementById("cloader");
  if (status == LOADER_STATE.SHOW) {
    loader.classList.add('loader-status-show');
    return;
  }
  loader.classList.remove('loader-status-show')
}
let Loader = {
  show: showLoader.bind(this, LOADER_STATE.SHOW),
  hide: showLoader.bind(this, LOADER_STATE.HIDE)
}

function toast(message, status) {
  $("#pet-toast-body").text(message)
  $("#pet-toast").addClass(`alert-${status}`);
  $("#pet-toast").css({ display: "inline-block" })
  setTimeout(() => {
    $("#pet-toast").removeClass(`alert-${status}`);
    $("#pet-toast").css({ display: "none" })
  }, 5000)
}

function toggleModal(modalId, state = "hide") {
  $(`#${modalId}`).modal(state);
  // let addReportModalBt = document.getElementById(modalBtnId);
  // addReportModalBt.addEventListener("click", () => {
  //   $(`#${modalId}`).modal(state);
  // })
}

// // Function to update app data and Firebase
async function updateAppDataAndFirebase(petInformation) {
  try {
    let petObj = [petInformation];
    Loader.show();
    await (await fetch(resolveUrl('/petinformation'), {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(petObj),
    }))?.json()
    Loader.hide();
    toast('Pet added succesfully', 'success')
    toggleModal("addPetModal", MODAL_STATE.HIDE)

  } catch (error) {
    toast('Unable to add pet', 'danger')
    console.error('Error updating app data or storing in Firebase:', error);
  }
}

async function addReports(reportId) {
  try {
    console.log({ reportId })
    let report_id = document.getElementById("addReportSearch")?.value || reportId;
    let pet_id = document.getElementById("petSelect").value;
    let response = await (await fetch(resolveUrl("/pet/report"), {
      method: "PUT",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        report_id,
        pet_id
      }),
    }))?.json();
    //fetch added report
    Loader.show();
    let report = await (await fetch(resolveUrl(`/report/${response.data.report_id}`), {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
    }))?.json();
    constructReports([report?.data || {}])
    Loader.hide();
    toast('Report added succesfully', 'success')
    toggleModal("addReportModal", MODAL_STATE.HIDE)
  } catch (err) {
    $("#pet-toast-body").text('Unable to add report')
    toast('Unable to add report', 'danger')
    console.error('Error updating app data or storing in Firebase:', err);
  }
}

document.getElementById("petSelect")?.addEventListener("select", function (e) {
  handleSelectChange(e)
})
//handle pet select
async function handleSelectChange(select) {
  const selectedOption = select.options[select.selectedIndex];
  if (selectedOption.id === "AddNewPet") {
    // Open the modal
    $('#addPetModal').modal('show');
    // Reset the select to the default option
    select.selectedIndex = 0;
  } else if (selectedOption.value) {
    Loader.show();
    let { data = [] } = await (await fetch(resolveUrl(`/reports/pet/${selectedOption.value}`, selectedOption), {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
    }))?.json();
    constructReports(data);
    Loader.hide()
  }
}

document.getElementById("addReportToPet")?.addEventListener('click', function () {
  addReports()
})

// // Event listener for when the input value changes
document.getElementById('addPetOn')?.addEventListener('click', async function (event) {
  const name = document.getElementById("petName")?.value;
  const yob = document.getElementById('yob').value;
  const pet_species = document.getElementById('type').value;
  const pet_image = document.getElementById('petImage').value;
  updateAppDataAndFirebase({ name, yob, pet_species, pet_image });
});


function getQueryParams() {
  var queryParams = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    queryParams[key] = value;
  }
  return queryParams;
}


function constructReports(reports = []) {
  const reportsContainer = document.getElementById("all-report");
  reportsContainer.innerHTML = ''
  if (!reports.length) {
    reportsContainer.innerHTML = '<div><h4>No reports found!!!</h4></div>>';
    return
  }
  reports.map((doc, index) => {
    const data = doc;
    reportFound = true;
    const reportDiv = document.createElement("div");
    const reportTitle = data.reportTitle || `Monthly Report ${index + 1}`;
    reportDiv.className = "m-report p-4";


    let summaryPage = '/pages/summary';
    if (data.species === 'dog') {
      summaryPage = '/pages/dog_summary';
    } else if (data.species === 'cat') {
      summaryPage = '/pages/cat_summary';
    }



    reportDiv.innerHTML += `
                  <h4>${reportTitle}</h4>
                  <br/>
                  <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
                  <p><strong>Age:</strong> ${data.age || 'N/A'}</p>
                  <p><strong>Date:</strong> ${data.date ? new Date(data.date.seconds * 1000).toDateString() : 'N/A'}</p>
                  <p><strong>Species:</strong> ${data.species || 'N/A'}</p>
                  <p><strong>Month:</strong> ${data.month ? new Date(data.month.seconds * 1000).getMonth() + 1 : 'N/A'}</p>
                  <br/>
                  <a class="btn btn-primary" href="#">Download</a>
                  <a class="btn btn-secondary" href="${summaryPage}?report_id=${data.id}" target="_blank">Open Report</a>
              `;

    reportsContainer?.appendChild(reportDiv);
  });
}
