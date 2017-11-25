var change = document.getElementById("logContainer");
var changeRequest = new XMLHttpRequest();

changeRequest.open("GET", "json/changelog.json", true);
changeRequest.onreadystatechange = function() {
  if (changeRequest.readyState === 4) {
    if (changeRequest.status === 200 || changeRequest.status == 0) {
      var html = "";

      JSON.parse(changeRequest.responseText).forEach(function(change) {
        var litem = "";
        console.log(change.name);
        for (var i in change.description) {
            litem += "<li> - " + change.description[i] + "</li><br>";
        }
        var newName = change.name.replace(/\./g, "_");
        html = "<div id=" + newName + " class=\"card\"><div class=\"card-content\"><span class=\"card-title\">" + change.name + "</span><div class=\"right reldate\">[" + change.reltype + "] " + change.reldate + "</div><ul>" +  litem + "</div></div>" + html;

      });
      change.innerHTML = html;
    }
  }
};
changeRequest.send(null);
