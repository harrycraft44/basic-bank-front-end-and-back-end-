
function s() {
  window.location.href = window.location.href + "/api/send/?m=" + document.getElementById('userid').content + "&t=" +document.getElementById('money').value;
  return false;
}
