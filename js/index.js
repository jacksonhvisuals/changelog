var userName = "jacksonhvisuals";
var repoName = "5217-web";

var change = document.getElementById("logContainer");
var changeRequest = new XMLHttpRequest();

changeRequest.open("GET", "https://api.github.com/repos/"+ userName +"/"+ repoName +"/releases", true);
changeRequest.onreadystatechange = function() {
  if (changeRequest.readyState === 4) {
    if (changeRequest.status === 200 || changeRequest.status == 0) {
      var html = "";
      var releaseType = "";
      
      JSON.parse(changeRequest.responseText).forEach(function(change) {
        if (change.prerelease === true) {
          releaseType = "Pre-Release";
        }
        console.log(change.published_at);
        var releaseDate = new Date(change.published_at);
        var newName = change.name.replace(/\./g, "_");
        html += "<div id=" + newName + " class=\"card\"><div class=\"card-content\"><span class=\"card-title\">" + change.name + "</span><div class=\"right reldate\">[" + releaseType + "] " + releaseDate.toLocaleDateString() + "</div><br>" +  change.body + "</div></div>";

      });
      change.innerHTML = html;
    }
  }
};
changeRequest.send(null);
