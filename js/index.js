var userName = "jacksonhvisuals";
var repoName = "5217-web";

var change = document.getElementById("logContainer");
var changeRequest = new XMLHttpRequest();

function prettyMonthName(themonth) {
  switch(themonth) {
    case 1:
      return "January";
      break;
    case 2:
      return "Feburary";
      break;
    case 3:
      return "March";
      break;
    case 4:
      return "April";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "June";
      break;
    case 7:
      return "July";
      break;
    case 8:
      return "August";
      break;
    case 9:
      return "September";
      break;
    case 10:
      return "October";
      break;
    case 11:
      return "November";
      break;
    case 12:
      return "December";
      break;
    default:
      return "month-name-error";
      break;
    
  }
}

function prettyTimeFormat(thehour) {
  var prettyHour;
  if (thehour > 0 && thehour < 12) {
    prettyHour = thehour;
  } else if (thehour > 12) {
    prettyHour = thehour - 12;
  } else if (thehour === 0) {
    prettyHour = 12;
  }
  return prettyHour;
}

function meridiem(thehour) {
  var ampm;
  if (thehour > 0 && thehour < 12) {
    ampm = "AM";
  } else if (thehour > 12) {
    ampm = "PM";
  } else if (thehour === 0) {
    ampm = "AM"
  }
  return ampm;
}

function createDate(thedate) {
  var primhours = thedate.getHours();
  var hours = prettyTimeFormat(primhours);
  var cycle = meridiem(primhours);
  var minutes = thedate.getMinutes();
  var seconds = thedate.getSeconds();
  var time = hours + ":" + minutes + ":" + seconds + "" + cycle;
  var day = thedate.getDay();
  var primmonth = thedate.getMonth();
  var month = prettyMonthName(primmonth);
  var year = thedate.getFullYear();
  var formattedDate = time + " on " + month + " " + day + ", " + year;
  return formattedDate;
  
}

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
        console.log(change.name);
        var releaseDate = new Date(change.published_at);
        var newName = change.name.replace(/\./g, "_");
        html += "<div id=" + newName + " class=\"card\"><div class=\"card-content\"><span class=\"card-title\">" + change.name + "</span><div class=\"right reldate\">[" + releaseType + "] " + createDate(releaseDate) + "</div><ul>" +  change.body + "</div></div>";

      });
      change.innerHTML = html;
    }
  }
};
changeRequest.send(null);
