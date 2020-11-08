var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#first-name")
var usersContainerEl = document.querySelector("#users-container");
var userSearchTerm = document.querySelector("#user-search-term");
var departmentButtonsEl = document.querySelector("#department-buttons")

function formSubmitHandler(event) {
    event.preventDefault();
    var name = nameInputEl.value.trim()

    if (name) {
        getUserRepos(name);
        nameInputEl.value = "";
    } else {
        alert("Please enter your co-workers first name!")
    }
};

function getUsers(user) {
    
    fetch('/api/users/')
        .then(function(response) {
            // request was successful
            if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
            } else {
            alert("Error: " + response.statusText);
            }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    });
    };

// var displayUsers = function(repos, searchTerm) {
//     // check if api returned any users
//     if (repos.length === 0) {
//         usersContainerEl.textContent = "No users found with that name.";
//         return;
//     };

//     // clear old content
//     usersContainerEl.textContent = "";
//     userSearchTerm.textContent = searchTerm;

//     // loop over repos
//     for (i = 0; i < repos.length; i++) {
//         // format repo name
//         var repoName = repos[i].owner.login + "/" + repos[i].name;

//         // create a container for each repo
//         var repoEl = document.createElement("a")
//         repoEl.classList = "list-item flex-row justify-space-between align-center";
//         repoEl.setAttribute("href","./single-repo.html?repo=" + repoName)

//         // create a span element to hold repository name
//         var titelEl = document.createElement("span");
//         titelEl.textContent = repoName;
        
//         // create a status element
//         var statusEl = document.createElement("span");
//         statusEl.classList = "flex-row align-center";

    
//         // append to container
//         repoEl.appendChild(titelEl);
//         repoEl.appendChild(statusEl);
        
//         // append container to the dom
//         usersContainerEl.appendChild(repoEl);
//     }
//     };

function getByDepartment(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language)
            });
        } else {
        alert("Error: " + response.statusText);
        }
    });
    };

function buttonClickHandler(event) {
    var department = event.target.getAttribute("department-buttons")
    if(department) {
        // sort by filter
        getByDepartment(department)

        // clear old content
        usersContainerEl.textContent = "";
    };
};

function UpdateButtonClickHandler(event) {
    event.preventDefault()
    document.location.replace('/account')
}

userFormEl.addEventListener("submit", formSubmitHandler)
departmentButtonsEl.addEventListener("click", buttonClickHandler);
document.querySelector("#update-btn").addEventListener("click", UpdateButtonClickHandler)

