var indo = new XMLHttpRequest();
indo.open("GET", "https://api.kawalcorona.com", true);
indo.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.response);
    for (var i = 0; i < data.length; i++) {
      if(data[i].attributes.Country_Region == "Indonesia") {
        console.log(data[i].attributes.Confirmed);
        document.querySelector(".highlight__total-number").innerHTML = data[i].attributes.Confirmed;
        document.querySelector("#perawatan").innerHTML = data[i].attributes.Active;
        document.querySelector("#sembuh").innerHTML = data[i].attributes.Recovered;
        document.querySelector("#meninggal").innerHTML = data[i].attributes.Deaths;
        var update = new Date(data[i].attributes.Last_Update);
        const newDate = update.toLocaleString(['ban', 'id'], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const newTime = update.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        document.querySelector(".last-update").innerHTML = String(newDate)+" | "+String(newTime);
      };
    }
  }
};
indo.send();

var provinsi = new XMLHttpRequest();
provinsi.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?f=json&where=Provinsi%20%3C%3E%20%27Indonesia%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Kasus_Terkonfirmasi_Akumulatif%20desc&outSR=102100&resultOffset=0&resultRecordCount=34&cacheHint=true",
  true
);
provinsi.onload = function() {
  var data = JSON.parse(this.response);
  if (this.status >= 200 && this.status < 400) {
    data.features.forEach(covid => {
      var div = document.createElement("DIV");
      div.setAttribute("class", "detail-province__list");
      div.innerHTML =
        `
      <div class="detail-province__list-marker"></div>
      <div class="detail-province__list-data">
      <div class="data-province">` +
        covid.attributes.Provinsi +
        `</div>
      <div class="data-covid">
        <div class="data-covid__detail">
          <div class="data-covid__detail-number">
            ` +
        covid.attributes.Kasus_Terkonfirmasi_Akumulatif +
        `
          </div>
          <div class="data-covid__detail-status">
            Terkonfirmasi
          </div>
        </div>
        <div class="data-covid__detail">
          <div class="data-covid__detail-number">
            ` +
        covid.attributes.Kasus_Sembuh_Akumulatif +
        `
          </div>
          <div class="data-covid__detail-status">
            Sembuh
          </div>
        </div>
        <div class="data-covid__detail">
          <div class="data-covid__detail-number">
            ` +
        covid.attributes.Kasus_Meninggal_Akumulatif +
        `
          </div>
          <div class="data-covid__detail-status">
            Meninggal
          </div>
        </div>
      </div>
    </div>
      `;
      document.querySelector(".detail-province").appendChild(div);
    });
  }
};
provinsi.send();

function BuildChart(hari, jmlKasusBaru, jmlKasus) {
  var data = {
    labels: hari,
    datasets: [
      {
        label: "Kasus Baru", // Name the series
        data: jmlKasusBaru,
        backgroundColor: "#34a5d6"
      },
      {
        label: "Jumlah Kasus", // Name the series
        data: jmlKasus,
        backgroundColor: "#c43aff"
      }
    ]
  };
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      responsive: true, // Instruct chart JS to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Jumlah Kasus"
            }
          }
        ]
      }
    }
  });
  return myChart;
}

function currentDate() {
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth()+1);
  var yy = String(today.getFullYear());
  return (yy+"-"+mm+"-"+dd);
}


var riwayat = new XMLHttpRequest();
var url = "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3Ctimestamp%20%27"+currentDate()+"%2017%3A00%3A00%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Tanggal%20asc&outSR=102100&resultOffset=0&resultRecordCount=2000&cacheHint=true";
riwayat.open(
  "GET", url,
  true
);
riwayat.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.response);
    var hari = data.features.map(function(e) {
      var date = new Date(e.attributes.Tanggal);
      const newDate = date.toLocaleString(['ban', 'id'], {month: 'short', day: 'numeric' });
      return newDate;
    });
    var jmlKasus = data.features.map(function(e) {
      return e.attributes.Jumlah_Kasus_Kumulatif;
    });
    var jmlKasusBaru = data.features.map(function(e) {
      return e.attributes.Jumlah_Kasus_Baru_per_Hari;
    });
    BuildChart(hari, jmlKasusBaru, jmlKasus);
  }
};
riwayat.send();

document
  .querySelector(".dashboard__nav-full")
  .addEventListener("click", function() {
    document.documentElement.requestFullscreen();
    document.documentElement.webkitRequestFullscreen();
  });

  