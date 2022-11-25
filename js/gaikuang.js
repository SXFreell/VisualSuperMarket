// Coded BY Freell(https://freell.top)

var dataByMonth;
var dataByYear;
var dataByType;
var dataByYearNext;
var icountry = "0";

function selectYear(year) {
    // Coded BY Freell(https://freell.top)
    var now = dataByYearNext[year];
    var sales = parseInt(now[0]);
    var profit = parseInt(now[1]);
    var quantity = parseInt(now[2]);
    $("#sales").text(sales.toLocaleString());
    $("#profit").text(profit.toLocaleString());
    $("#quantity").text(quantity.toLocaleString());
    if (now[3]) {
        var salesChange = (now[4] * 100).toFixed(2).toString() + "%";
        if (now[4] > 0) {
            $("#salesChange").text(" ▲" + salesChange).css("color", "red");
        } else {
            $("#salesChange").text(" ▼" + salesChange).css("color", "green");
        }
        var profitChange = (now[5] * 100).toFixed(2).toString() + "%";
        if (now[5] > 0) {
            $("#profitChange").text(" ▲" + profitChange).css("color", "red");
        } else {
            $("#profitChange").text(" ▼" + profitChange).css("color", "green");
        }
        var quantityChange = (now[6] * 100).toFixed(2).toString() + "%";
        if (now[6] > 0) {
            $("#quantityChange").text(" ▲" + quantityChange).css("color", "red");
        } else {
            $("#quantityChange").text(" ▼" + quantityChange).css("color", "green");
        }
    } else {
        $("#salesChange").text("   ---");
        $("#profitChange").text("   ---");
        $("#quantityChange").text("   ---");
    }
    var sptlist = zhuzhuangtubegin(dataByType, icountry);
    zhuzhuangtu(sptlist[0], sptlist[1], sptlist[2], sptlist[3]);
    updateTable();
    if(year != "0"){
        $(".syear").text(year+"年");
    } else {
        $(".syear").empty();
    }
}

function getdataByYearNext(idataByYear) {
    // Coded BY Freell(https://freell.top)
    var idataByYearNext = new Object();
    var yearlist = Object.keys(idataByYear);
    for (let i of yearlist) {
        idataByYearNext[i] = new Array();
        var sales = 0;
        var profit = 0;
        var quantity = 0;
        for (let j of idataByYear[i]) {
            sales = sales + parseFloat(j.Sales);
            profit = profit + parseFloat(j.Profit);
            quantity = quantity + parseFloat(j.Quantity);
        }
        idataByYearNext[i].push(sales, profit, quantity);
    }
    var now = idataByYear[yearlist[0]];
    for (let i of yearlist) {
        if (i == yearlist[0]) continue;
        now = now.concat(idataByYear[i]);
    }
    idataByYearNext["0"] = new Array();
    var sales = 0;
    var profit = 0;
    var quantity = 0;
    for (let j of now) {
        sales = sales + parseFloat(j.Sales);
        profit = profit + parseFloat(j.Profit);
        quantity = quantity + parseFloat(j.Quantity);
    }
    idataByYearNext["0"].push(sales, profit, quantity);
    yearlist.unshift("0");
    for (let i = 0; i < yearlist.length; i++) {
        if (i <= 1) {
            idataByYearNext[yearlist[i]].push(false);
        } else {
            idataByYearNext[yearlist[i]].push(
                true,
                idataByYearNext[yearlist[i]][0] / idataByYearNext[yearlist[i - 1]][0] - 1,
                idataByYearNext[yearlist[i]][1] / idataByYearNext[yearlist[i - 1]][1] - 1,
                idataByYearNext[yearlist[i]][2] / idataByYearNext[yearlist[i - 1]][2] - 1
            );
        }
    }
    dataByYearNext = idataByYearNext;
}

function getAllData(indataByMonth, indataByYear, indataByType) {
    // Coded BY Freell(https://freell.top)
    dataByYear = indataByYear;
    dataByMonth = indataByMonth;
    dataByType = indataByType;
    getdataByYearNext(dataByYear);
    selectYear("0");
    var yearlist = Object.keys(dataByYear);
    $("#selectyear").empty();
    $("#selectyear").append('<option value="0">全部</option>');
    for (let i of yearlist) {
        var temp = "<option value='" + i + "'>" + i + "</option>";
        $("#selectyear").append(temp);
    }
    var spmlist = zhexiantubegin(dataByMonth, "0");
    zhexiantu(spmlist[0], spmlist[1], spmlist[2]);
    var sptlist = zhuzhuangtubegin(dataByType, "0");
    zhuzhuangtu(sptlist[0], sptlist[1], sptlist[2], sptlist[3]);
    updateTable();
}

function gkgetdata(data) {
    // Coded BY Freell(https://freell.top)
    var country = data.properties.name;
    icountry = country;
    var dataByYearCountry = new Object();
    var yearlist = Object.keys(dataByYear);
    for (let i of yearlist) {
        dataByYearCountry[i] = new Array();
        for (let j of dataByYear[i]) {
            if (j.Country == country) {
                dataByYearCountry[i].push(j);
            }
        }
    }
    $(".countryname").text(country);
    getdataByYearNext(dataByYearCountry);
    selectYear("0");
    var yearlist = Object.keys(dataByYear);
    $("#selectyear").empty();
    $("#selectyear").append('<option value="0">全部</option>');
    for (let i of yearlist) {
        var temp = "<option value='" + i + "'>" + i + "</option>";
        $("#selectyear").append(temp);
    }
    var spmlist = zhexiantubegin(dataByMonth, country);
    zhexiantu(spmlist[0], spmlist[1], spmlist[2]);
    var sptlist = zhuzhuangtubegin(dataByType, country);
    zhuzhuangtu(sptlist[0], sptlist[1], sptlist[2], sptlist[3]);
    updateTable();
}

function emptyselect() {
    // Coded BY Freell(https://freell.top)
    icountry = "0";
    getdataByYearNext(dataByYear);
    selectYear("0");
    var yearlist = Object.keys(dataByYear);
    $("#selectyear").empty();
    $(".countryname").empty();
    $("#selectyear").append('<option value="0">全部</option>');
    for (let i of yearlist) {
        var temp = "<option value='" + i + "'>" + i + "</option>";
        $("#selectyear").append(temp);
    }
    var spmlist = zhexiantubegin(dataByMonth, "0");
    zhexiantu(spmlist[0], spmlist[1], spmlist[2]);
    var sptlist = zhuzhuangtubegin(dataByType, "0");
    zhuzhuangtu(sptlist[0], sptlist[1], sptlist[2], sptlist[3]);
    updateTable();
    $(".syear").empty();
}

function updateTable() {
    // Coded BY Freell(https://freell.top)
    var year = $("#selectyear").val();
    if (year == "0") {
        var yearlist = Object.keys(dataByYear);
        var now = dataByYear[yearlist[0]];
        for (let i of yearlist) {
            if (i == yearlist[0]) continue;
            now = now.concat(dataByYear[i]);
        }
    } else {
        var now = dataByYear[year];
    }
    var temp = new Array();
    var countryData = new Array();
    for (let i of now) {
        var nowindex = temp.indexOf(i.Country);
        if (nowindex == -1) {
            temp.push(i.Country);
            countryData.push(new Object({
                Country: i.Country,
                Sales: parseFloat(i.Sales),
                Profit: parseFloat(i.Profit)
            }));
        } else {
            countryData[nowindex].Sales = countryData[nowindex].Sales + parseFloat(i.Sales);
            countryData[nowindex].Profit = countryData[nowindex].Profit + parseFloat(i.Profit);
        }
    }
    countryData.sort(function (a, b) {
        return b.Sales - a.Sales;
    });
    var tabletemp = "";
    for (let i = 0; i < countryData.length; i++) {
        if (countryData[i].Profit < 0) {
            tabletemp = tabletemp + "<tr><td>" + (i + 1) + "</td><td>" + countryData[i].Country + "</td><td>" + countryData[i].Sales.toFixed(2) + "</td><td style='background-color:#E63946'>$" + countryData[i].Profit.toFixed(2) + "</td></tr>";
        } else {
            tabletemp = tabletemp + "<tr><td>" + (i + 1) + "</td><td>" + countryData[i].Country + "</td><td>$" + countryData[i].Sales.toFixed(0) + "</td><td>$" + countryData[i].Profit.toFixed(0) + "</td></tr>";
        }
    }
    $("#mytbody").empty();
    $("#mytbody").append(tabletemp);
}

function zhexiantubegin(datamonth, countrymonth) {
    // Coded BY Freell(https://freell.top)
    var monthlist = Object.keys(datamonth);
    var sales = new Array();
    var profit = new Array();
    for (let i = 0; i < monthlist.length; i++) {
        sales.push(0);
        profit.push(0);
        for (let j of datamonth[monthlist[i]]) {
            if (j.Country == countrymonth) {
                sales[i] = sales[i] + parseFloat(j.Sales);
                profit[i] = profit[i] + parseFloat(j.Profit);
            } else if (countrymonth == "0") {
                sales[i] = sales[i] + parseFloat(j.Sales);
                profit[i] = profit[i] + parseFloat(j.Profit);
            }
        }
        sales[i] = sales[i].toFixed(0);
        profit[i] = profit[i].toFixed(0);
    }
    return [sales, profit, monthlist];
}

function zhuzhuangtubegin(datatype, countrytype) {
    // Coded BY Freell(https://freell.top)
    var year = $("#selectyear").val();
    var typelist = Object.keys(datatype);
    var sales = new Array();
    var profit = new Array();
    var sp = new Array();
    for (let i = 0; i < typelist.length; i++) {
        sales.push(0);
        profit.push(0);
        for (let j of datatype[typelist[i]]) {
            if (j.Country == countrytype && j.Year == year) {
                sales[i] = sales[i] + parseFloat(j.Sales);
                profit[i] = profit[i] + parseFloat(j.Profit);
            } else if (countrytype == "0" && j.Year == year) {
                sales[i] = sales[i] + parseFloat(j.Sales);
                profit[i] = profit[i] + parseFloat(j.Profit);
            } else if (countrytype == "0" && year == "0") {
                sales[i] = sales[i] + parseFloat(j.Sales);
                profit[i] = profit[i] + parseFloat(j.Profit);
            } else if (j.Country == countrytype && year == "0") {
                sales[i] = sales[i] + parseFloat(j.Sales);
                profit[i] = profit[i] + parseFloat(j.Profit);
            }
        }
        sales[i] = sales[i].toFixed(0);
        profit[i] = profit[i].toFixed(0);
        sp[i] = (profit[i] / sales[i] * 100).toFixed(2);
    }
    var temp = new Array();
    for (let i = 0; i < typelist.length; i++) {
        temp.push(new Object({
            Type: typelist[i],
            Sales: sales[i],
            Profit: profit[i],
            SP: sp[i]
        }));
    }
    temp.sort(function (a, b) {
        return b.Sales - a.Sales;
    });
    var typelist = new Array();
    var sales = new Array();
    var profit = new Array();
    var sp = new Array();
    for (let i = 0; i < temp.length; i++) {
        typelist.push(temp[i].Type);
        sales.push(temp[i].Sales);
        profit.push(temp[i].Profit);
        sp.push(temp[i].SP);
    }
    return [sales, profit, sp, typelist];
}

function zhexiantu(sales, profit, monthlist) {
    // Refer FROM echarts(https://echarts.apache.org/)
    var chartDom = document.getElementById('zhexiantu');
    var myChart = echarts.init(chartDom, null, {
        renderer: 'svg'
    });
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['销售额', '利润']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: monthlist
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
                name: '销售额',
                type: 'line',
                stack: 'Total',
                // areaStyle: {},
                // emphasis: {
                //     focus: 'series'
                // },
                data: sales
            },
            {
                name: '利润',
                type: 'line',
                stack: 'Total',
                data: profit
            }
        ]
    };

    option && myChart.setOption(option);
}

function zhuzhuangtu(sales, profit, sp, typelist) {
    // Refer FROM echarts(https://echarts.apache.org/)
    console.log(sales, profit, sp, typelist);
    var chartDom = document.getElementById('zhuzhuangtu');
    var myChart = echarts.init(chartDom, null, {
        renderer: 'svg'
    });
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['销售额', '利润', '利润率']
        },
        xAxis: [{
            type: 'category',
            data: typelist,
            axisPointer: {
                type: 'shadow'
            }
        }],
        yAxis: [{
                type: 'value',
                name: '销售额/利润',
                stack: 'Total',
                axisLabel: {
                    formatter: '${value}'
                }
            },
            {
                type: 'value',
                name: '利润率',
                stack: 'Total',
                axisLabel: {
                    formatter: '{value}%'
                }
            }
        ],
        series: [{
                name: '销售额',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return "$"+value;
                    }
                },
                data: sales
            },
            {
                name: '利润',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return "$"+value;
                    }
                },
                data: profit
            },
            {
                name: '利润率',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: sp
            }
        ]
    };

    option && myChart.setOption(option);
}

// Coded BY Freell(https://freell.top)