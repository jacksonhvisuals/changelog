var userName = "jacksonhvisuals";
var repoName = "5217-web";

var change = document.getElementById("logContainer");
var changeRequest = new XMLHttpRequest();

changeRequest.open("GET", "https://api.github.com/repos/"+ userName +"/"+ repoName +"/releases", true);
changeRequest.onreadystatechange = function() {
  if (changeRequest.readyState === 4) {
    if (changeRequest.status === 200 || changeRequest.status == 0) {
      var html = "";

      JSON.parse(changeRequest.responseText).forEach(function(change) {
        console.log(change.name);
        var newName = change.name.replace(/\./g, "_");
        html += "<div id=" + newName + " class=\"card\"><div class=\"card-content\"><span class=\"card-title\">" + change.name + "</span><div class=\"right reldate\">[" + change.prerelease + "] " + change.published_at + "</div><ul>" +  change.body + "</div></div>";

      });
      change.innerHTML = html;
    }
  }
};
changeRequest.send(null);
