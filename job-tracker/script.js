const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const emptyAddBtn = document.getElementById("emptyAddBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const applicationForm = document.getElementById("applicationForm");
const applicationList = document.getElementById("applicationList");
const searchInput = document.getElementById("searchInput");

const filterButtons = document.querySelectorAll(".filter-btn");

let applications = JSON.parse(localStorage.getItem("jobApplications")) || [];
let currentFilter = "All";
let editingId = null;


// =========================
// MODAL
// =========================

function openModal() {
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
    applicationForm.reset();
    editingId = null;
}

openModalBtn.addEventListener("click", function () {
    editingId = null;
    applicationForm.reset();
    openModal();
});

emptyAddBtn.addEventListener("click", function () {
    editingId = null;
    applicationForm.reset();
    openModal();
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});


// =========================
// SAVE DATA
// =========================

function saveApplications() {
    localStorage.setItem(
        "jobApplications",
        JSON.stringify(applications)
    );
}


// =========================
// ADD / EDIT APPLICATION
// =========================

applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const company = document.getElementById("company").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;
    const jobLink = document.getElementById("jobLink").value.trim();

    if (editingId !== null) {

        const application = applications.find(function (app) {
            return app.id === editingId;
        });

        if (application) {
            application.company = company;
            application.jobTitle = jobTitle;
            application.date = date;
            application.status = status;
            application.jobLink = jobLink;
        }

    } else {

        const newApplication = {
            id: Date.now(),
            company: company,
            jobTitle: jobTitle,
            date: date,
            status: status,
            jobLink: jobLink
        };

        applications.push(newApplication);
    }

    saveApplications();
    closeModal();
    renderApplications();
});


// =========================
// DELETE APPLICATION
// =========================

function deleteApplication(id) {

    applications = applications.filter(function (application) {
        return application.id !== id;
    });

    saveApplications();
    renderApplications();
}


// =========================
// EDIT APPLICATION
// =========================

function editApplication(id) {

    const application = applications.find(function (app) {
        return app.id === id;
    });

    if (!application) {
        return;
    }

    editingId = id;

    document.getElementById("company").value = application.company;
    document.getElementById("jobTitle").value = application.jobTitle;
    document.getElementById("date").value = application.date;
    document.getElementById("status").value = application.status;
    document.getElementById("jobLink").value = application.jobLink;

    openModal();
}


// =========================
// STATISTICS
// =========================

function updateStatistics() {

    document.getElementById("totalApplications").textContent =
        applications.length;

    document.getElementById("appliedCount").textContent =
        applications.filter(function (app) {
            return app.status === "Applied";
        }).length;

    document.getElementById("interviewCount").textContent =
        applications.filter(function (app) {
            return app.status === "Interview";
        }).length;

    document.getElementById("selectedCount").textContent =
        applications.filter(function (app) {
            return app.status === "Selected";
        }).length;

    document.getElementById("rejectedCount").textContent =
        applications.filter(function (app) {
            return app.status === "Rejected";
        }).length;
}


// =========================
// RENDER APPLICATIONS
// =========================

function renderApplications() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredApplications = applications.filter(function (application) {

        const matchesSearch =
            application.company.toLowerCase().includes(searchTerm) ||
            application.jobTitle.toLowerCase().includes(searchTerm);

        const matchesFilter =
            currentFilter === "All" ||
            application.status === currentFilter;

        return matchesSearch && matchesFilter;
    });

    applicationList.innerHTML = "";

    if (filteredApplications.length === 0) {

        applicationList.innerHTML = `
            <div class="empty-state">

                <h3>No applications found</h3>

                <p>
                    Add an application or change your filters.
                </p>

                <button
                    class="primary-btn"
                    id="emptyAddButton">
                    + Add Application
                </button>

            </div>
        `;

        document
            .getElementById("emptyAddButton")
            .addEventListener("click", function () {
                editingId = null;
                applicationForm.reset();
                openModal();
            });

        updateStatistics();
        return;
    }


    filteredApplications.forEach(function (application) {

        const card = document.createElement("div");

        card.className = "application-card";

        card.innerHTML = `
            <div class="application-info">

                <h3>
                    ${escapeHTML(application.company)}
                </h3>

                <p>
                    ${escapeHTML(application.jobTitle)}
                </p>

                <small>
                    Applied: ${escapeHTML(application.date)}
                </small>

            </div>

            <div class="application-actions">

                <span class="status ${application.status.toLowerCase()}">
                    ${escapeHTML(application.status)}
                </span>

                ${
                    application.jobLink
                        ? `
                            <a
                                href="${escapeHTML(application.jobLink)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="view-job">
                                View Job
                            </a>
                        `
                        : ""
                }

                <button
                    class="edit-btn">
                    Edit
                </button>

                <button
                    class="delete-btn">
                    Delete
                </button>

            </div>
        `;


        card
            .querySelector(".edit-btn")
            .addEventListener("click", function () {
                editApplication(application.id);
            });


        card
            .querySelector(".delete-btn")
            .addEventListener("click", function () {

                if (confirm("Delete this application?")) {
                    deleteApplication(application.id);
                }

            });


        applicationList.appendChild(card);
    });

    updateStatistics();
}


// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", function () {
    renderApplications();
});


// =========================
// FILTERS
// =========================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderApplications();
    });

});


// =========================
// SECURITY
// =========================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================
// START
// =========================

renderApplications();
