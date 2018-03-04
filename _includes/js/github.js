var init = function () {
  xhttp.open("GET", url, true);
  xhttp.send();

  // Start the github calendar
  new GitHubCalendar(".calendar", "amcolash", { responsive: true, global_stats: false });
}

var repos = false;
var cal = false;
var updateSpinner = function(personalRepos, calendar) {
  repos |= personalRepos;
  cal |= calendar;

  console.log("spinner, repos: " + repos + ", cal: " + cal);

  if (repos && cal) {
    console.log("showing spinner")
    var spinner = document.getElementsByClassName("spinner");
    spinner[0].style.display = 'none';
  }
}

// Start the scripts on this page.
window.onload = init;

// Github repo list
var url = "https://api.github.com/users/amcolash/repos?type=all&sort=pushed&per_page=100";

// Make the actual svg element to attach
var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgElement.setAttribute("viewBox", "0 0 10 16");
svgElement.style.height = "20px";
svgElement.style.paddingLeft = "6px";
svgElement.style.position = "relative";
svgElement.style.bottom = "-2px";

// Svg path for fork image
var forkIcon = "M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z";
var pathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
pathElement.setAttribute("d", forkIcon); //Set path's data
svgElement.appendChild(pathElement);

var lastShown = 0;

// Start a new network request for github repos on page load
var xhttp = new XMLHttpRequest();
xhttp.timeout = 10000; // Timeout after 10 seconds, say something went wrong
xhttp.onreadystatechange=function() {
  if (xhttp.readyState == 4) {
    // Uh-oh, something went wrong
    if (xhttp.status != 200) {
      // Fallback, just go to github page
      var error = document.createElement("h3");
      var retry = document.createElement("span");

      error.innerHTML = "Error fetching git repos. Try going to <a href='https://github.com/amcolash'>https://github.com/amcolash</a>.";
      retry.innerHTML = "<a href='/github'>Retry</a>";
      
      var repos = document.getElementById("repositories");
      repos.appendChild(error);
      repos.appendChild(retry);
    } else {
      // Normal case of 200 status
      var data = JSON.parse(xhttp.responseText);

      // console.log(data);

      var repos = document.getElementById("repositories");
      var title = document.getElementsByClassName("post-title");
      title[0].innerHTML = "Github Repositories I Contribute To (" + data.length + ")";

      var date_options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};

      lastShown = 0;

      for (var i = 0; i < data.length; i++) {
        var repo = data[i];
        var name = repo.name;
        var date = (new Date(repo.pushed_at)).toLocaleDateString('en-US', date_options);
        var description = repo.description;
        var url = repo.html_url;
        var fork = repo.fork;

        var repoDiv = document.createElement("div");
        repoDiv.className = "repo";

        var link = document.createElement("a");
        link.href = url;
        link.innerHTML = name;

        var nameHeader = document.createElement("h3");

        if (fork) {
          link.appendChild(svgElement.cloneNode(true));
        }

        nameHeader.appendChild(link);

        var hr = document.createElement("hr");

        var grid = document.createElement("div");
        grid.className = "row";

        var descriptionSpan = document.createElement("div");
        descriptionSpan.innerHTML = description;
        descriptionSpan.className = "col-xs-12 col-sm-7";
        grid.appendChild(descriptionSpan);

        var dateSpan = document.createElement("div");
        dateSpan.innerHTML = "Last Pushed: " + date;
        dateSpan.className = "col-xs-12 col-sm-5 end-sm";
        grid.appendChild(dateSpan);

        repoDiv.appendChild(nameHeader);
        repoDiv.appendChild(hr);
        repoDiv.appendChild(grid);
        repos.appendChild(repoDiv);

        var bounds = repoDiv.getBoundingClientRect();
        if (i > 4 && bounds.top >= 0 && (bounds.bottom - bounds.height) <= (window.innerHeight || document.documentElement.clientHeight)) {
          repoDiv.style.opacity = 0;
          repoDiv.style.animationName = 'fadein';
          repoDiv.style.animationDelay = (i * 0.1) + 's';

          lastShown = i;
        // } else if (i > (lastShown * 2)) {
        } else {
          repoDiv.style.display = "none";
        }
      }

      var showContainer = document.createElement("div");
      showContainer.classList += "padding-top";
      showContainer.id = "showContainer";

      var showMore = document.createElement("span");
      showMore.innerText = "Show More";
      showMore.classList += "btn";
      showMore.addEventListener("click", function() { window.showMore(); }, false);
      
      showContainer.appendChild(showMore);
      repos.appendChild(showContainer);

      updateSpinner(true, false);
    }
  }
};


var showMore = function () {
  var offset = lastShown * 2;
  var repos = document.getElementById("repositories");
  for (var i = offset; i < repos.children.length; i++) {
    var repoDiv = repos.children[i];

    if (repoDiv.id !== "showContainer") {
      repoDiv.style.display = "inherit";
      if (i < lastShown * 3) {
        repoDiv.style.opacity = 0;
        repoDiv.style.animationName = 'fadein';
        repoDiv.style.animationDelay = ((i - offset) * 0.1) + 's';
      }
    }
  }

  var showContainer = document.getElementById("showContainer");
  showContainer.hidden = true;
};