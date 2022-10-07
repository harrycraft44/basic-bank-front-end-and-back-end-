const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});
notifications_container = document.querySelector(".notifications");
var pushNotification = function (message, color) {
  notification = document.createElement("div");
  x_close = document.createElement("div");
  x_close.appendChild(document.createElement("div"));
  x_close.appendChild(document.createElement("div"));
  notification.appendChild(x_close);
  notification.appendChild(
    document.createElement("p").appendChild(document.createTextNode(message))
  );
  notification.classList.add(color);
  notifications_container.appendChild(notification);
  notification.firstChild.addEventListener("click", function () {
    this.parentNode.classList.add("fading_out");
    setTimeout(function () {
      notification.parentNode.removeChild(notification);
    }, 1000);
  });
  setTimeout(function () {
    notification.parentNode.removeChild(notification);
  }, 7000);
};
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
} 

var myCookie = getCookie("b");

if (myCookie == null) {
  document.cookie = "b=n";
  pushNotification("message encryption enabled ", "normal");
}
else {
    // do cookie exists stuff
}