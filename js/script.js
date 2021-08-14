document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value;
  getjobs().then((jobs) => {
    let filteredJobs = filterjobs(jobs, text);
    showjobs(filteredJobs);
  });
});

function getjobs() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function filterjobs(jobs, searchText) {
  if (searchText) {
    let filterdJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filterdJobs;
  } else {
    return jobs;
  }
}

function showjobs(jobs) {
  let jobsContainer = document.querySelector(".jobs-container");
  let jobsHTML = "";
  jobs.forEach((job) => {
    jobsHTML += `<div class="job-tile">
        <div class="top">
          <img
            src="${job.logo}"
          />
          <span class="material-icons more_horiz"> more_horiz </span>
        </div>
        <div class="rolename">
          <span>${job.roleName}</span>
        </div>
        <div class="description">
          <span>${job.requirements.content}</span>
        </div>
        <div class="buttons">
          <div class="button apply-now">Apply Now</div>
          <div class="button">Message</div>
        </div>
      </div>`;
  });
  jobsContainer.innerHTML = jobsHTML;
}

getjobs().then((data) => {
  showjobs(data);
});
