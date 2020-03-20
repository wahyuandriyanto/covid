var positif = new XMLHttpRequest();
positif.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3E%3Dtimestamp%20%272020-03-19%2017%3A00%3A00%27%20AND%20Tanggal%3C%3Dtimestamp%20%272020-03-20%2016%3A59%3A59%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Jumlah_Kasus_Kumulatif%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true",
  true
);
positif.onload = function() {
  var data = JSON.parse(this.response);
  if (positif.status >= 200 && positif.status < 400) {
    data.features.forEach(covid => {
      document.querySelector(".highlight__total-number").innerHTML =
        covid.attributes.value;
      console.log(covid.attributes.value);
    });
  } else {
    console.log("error");
  }
};
positif.send();

var perawatan = new XMLHttpRequest();
perawatan.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3E%3Dtimestamp%20%272020-03-19%2017%3A00%3A00%27%20AND%20Tanggal%3C%3Dtimestamp%20%272020-03-20%2016%3A59%3A59%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Jumlah_pasien_dalam_perawatan%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true",
  true
);
perawatan.onload = function() {
  var data = JSON.parse(this.response);
  if (perawatan.status >= 200 && perawatan.status < 400) {
    data.features.forEach(covid => {
      document.querySelector("#perawatan").innerHTML = covid.attributes.value;
    });
  } else {
    console.log("error");
  }
};
perawatan.send();

var sembuh = new XMLHttpRequest();
sembuh.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3E%3Dtimestamp%20%272020-03-19%2017%3A00%3A00%27%20AND%20Tanggal%3C%3Dtimestamp%20%272020-03-20%2016%3A59%3A59%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Jumlah_Pasien_Sembuh%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true",
  true
);
sembuh.onload = function() {
  var data = JSON.parse(this.response);
  if (sembuh.status >= 200 && sembuh.status < 400) {
    data.features.forEach(covid => {
      document.querySelector("#sembuh").innerHTML = covid.attributes.value;
    });
  } else {
    console.log("error");
  }
};
sembuh.send();

var meninggal = new XMLHttpRequest();
meninggal.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?f=json&where=Tanggal%3E%3Dtimestamp%20%272020-03-19%2017%3A00%3A00%27%20AND%20Tanggal%3C%3Dtimestamp%20%272020-03-20%2016%3A59%3A59%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Jumlah_Pasien_Meninggal%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true",
  true
);
meninggal.onload = function() {
  var data = JSON.parse(this.response);
  if (meninggal.status >= 200 && meninggal.status < 400) {
    data.features.forEach(covid => {
      document.querySelector("#meninggal").innerHTML = covid.attributes.value;
    });
  } else {
    console.log("error");
  }
};
meninggal.send();

var provinsi = new XMLHttpRequest();
provinsi.open(
  "GET",
  "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?f=json&where=Provinsi%20%3C%3E%20%27Indonesia%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Kasus_Terkonfirmasi_Akumulatif%20desc&outSR=102100&resultOffset=0&resultRecordCount=34&cacheHint=true",
  true
);
provinsi.onload = function() {
  var data = JSON.parse(this.response);
  if (provinsi.status >= 200 && provinsi.status < 400) {
    data.features.forEach(covid => {
      var div = document.createElement("DIV");
      div.setAttribute("class", "detail-province__list");
      div.innerHTML = `
      <div class="detail-province__list-marker"></div>
      <div class="detail-province__list-data">
      <div class="data-province">`+covid.attributes.Provinsi+`</div>
      <div class="data-covid">
        <div class="data-covid__detail">
          <div class="data-covid__detail-number">
            `+covid.attributes.Kasus_Terkonfirmasi_Akumulatif+`
          </div>
          <div class="data-covid__detail-status">
            Terkonfirmasi
          </div>
        </div>
        <div class="data-covid__detail">
          <div class="data-covid__detail-number">
            `+covid.attributes.Kasus_Sembuh_Akumulatif+`
          </div>
          <div class="data-covid__detail-status">
            Sembuh
          </div>
        </div>
        <div class="data-covid__detail">
          <div class="data-covid__detail-number">
            `+covid.attributes.Kasus_Meninggal_Akumulatif+`
          </div>
          <div class="data-covid__detail-status">
            Meninggal
          </div>
        </div>
      </div>
    </div>
      `;
      document.querySelector(".detail-province").appendChild(div);
      console.log(covid.attributes.Provinsi);
      //covid.attributes.Kasus_Terkonfirmasi_Akumulatif;
      //covid.attributes.Kasus_Sembuh_Akumulatif;
      //covid.attributes.Kasus_Meninggal_Akumulatif;
    });
  } else {
    console.log("error");
  }
};
provinsi.send();

document.querySelector('.dashboard__nav-full').addEventListener('click', function(){
    document.documentElement.requestFullscreen();
    document.documentElement.webkitRequestFullscreen()
})
