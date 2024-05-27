function Aktualizuj_zegar() {

  var teraz = new Date();
  var czas= teraz.toLocaleTimeString();
  var data = teraz.toLocaleDateString();

  document.getElementById('zegar').textContent = czas;
  document.getElementById('data').textContent = data;

}

function Aktualizuj_jaki_czas_uplynal() {

  var obeczny_czas = new Date().getTime();
  var czas_startu = sessionStorage.getItem('czas_startu');

  if (!czas_startu) {
    czas_startu = obeczny_czas;
    sessionStorage.setItem('czas_startu', czas_startu);
  }

  var czas_jaki_uplunal = obeczny_czas - czas_startu;

  document.getElementById('czas_uplunal').textContent = (czas_jaki_uplunal / 1000).toFixed(0) + ' sekund';
}


setInterval(Aktualizuj_zegar, 1000);
setInterval(Aktualizuj_jaki_czas_uplynal, 1000);
