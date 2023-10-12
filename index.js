const createMap = (dataArr) => {
    google.charts.load('current', {
        'packages':['geochart'],
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
    
      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ...dataArr
        ]);
    
        var options = {};
    
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
        chart.draw(data, options);
      }
}

const createChart = (data1) => {
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Age', 'Weight'],
          ...data1
        ]);

        var options = {
          title: 'Age vs. Weight comparison',
          hAxis: {title: 'Age', minValue: 0, maxValue: 15},
          vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }
}

const init = async() => {
    const response = await fetch('convertcsv.json')
    const csvdata = await response.json()
    console.log(csvdata)
    const tempMap = {}
    const dataAgevsRevenue=[]
    csvdata.forEach(element => {
        if (tempMap[element.Country]){
            tempMap[element.Country] ++
        } else{
            tempMap[element.Country] = 1 
        }
        dataAgevsRevenue.push([element.Age, element["Monthly Revenue"]])
    });

    console.log([...dataAgevsRevenue])
    const dataArr = []

    for (const key in tempMap){
        dataArr.push([key, tempMap[key]])
    }



    createMap(dataArr)
    createChart(dataAgevsRevenue)
}

init()