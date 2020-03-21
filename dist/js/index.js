var indo = new XMLHttpRequest();
indo.open("GET", "https://api.kawalcorona.com/indonesia/", true);
indo.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.response);
    var positif = data.map(function(e) {
      return e.positif;
    });
    var sembuh = data.map(function(e) {
      return e.sembuh;
    });
    var meninggal = data.map(function(e) {
      return e.meninggal;
    });
    var perawatan = parseInt(positif + sembuh + meninggal);
    document.querySelector(".highlight__total-number").innerHTML = parseInt(positif);
    document.querySelector("#sembuh").innerHTML = parseInt(sembuh);
    document.querySelector("#meninggal").innerHTML = parseInt(meninggal);
    document.querySelector("#perawatan").innerHTML = parseInt(positif) - parseInt(sembuh) - parseInt(meninggal);
  } else {
    console.log("error");
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
  } else {
    console.log("error");
  }
};
provinsi.send();

function BuildChart(labels, values) {
  var data = {
    labels: labels,
    datasets: [
      {
        label: "whatever", // Name the series
        data: values,
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)",
          "rgb(54, 162, 235)"
        ]
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
              display: true,
              labelString: "$ Billion"
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Name"
            }
          }
        ]
      }
    }
  });
  return myChart;
}

var riwayat = new XMLHttpRequest();
riwayat.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3Ctimestamp%20%272020-03-21%2017%3A00%3A00%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Tanggal%20asc&outSR=102100&resultOffset=0&resultRecordCount=2000&cacheHint=true",
  true
);
riwayat.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.response);
    var labels = data.features.map(function(e) {
      return e.attributes.Hari_ke;
    });
    var values = data.features.map(function(e) {
      return e.attributes.Jumlah_Kasus_Kumulatif;
    });
    BuildChart(labels, values);
  } else {
    console.log("error");
  }
};
riwayat.send();

document
  .querySelector(".dashboard__nav-full")
  .addEventListener("click", function() {
    document.documentElement.requestFullscreen();
    document.documentElement.webkitRequestFullscreen();
  });
