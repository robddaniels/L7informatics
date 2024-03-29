// global consts

const uploadCSV = document.querySelector('#upload-csv'),
    fileUploadButton = document.querySelector('.file-upload'),
    clearDataButton = document.querySelector('#clear-data'),
    loaderText = document.querySelector('.loader-text'),
    resultsLengthSpan = document.querySelector('#results-length'),
    resultsDifferentialSpan = document.querySelector('#results-differential'),
    resultsConclusion = document.querySelector('#results-conclusion'),
    resultsConclusionSupportSpan = document.querySelector('#results-conclusion-support'),
    clearThis = document.querySelectorAll('.clear-this');

// clear any existing data/results

const clearData = () => {
    const clearThisArr = Array.from(clearThis);
    clearThisArr.forEach(function (item) { // clear stored data and results
        item.innerText = '';
    })
    chartData.series = []; // clear chart data
    renderChart(); // re-draw empty chart
    clearDataButton.style.display = 'none'; // hide clear data button
    fileUploadButton.style.display = 'inline-block'; // show upload button
    resultsConclusion.style.display = 'none';
}

// upload and parse .csv to calculate percentages for chart

const fileUploaded = () => { // trigger when .csv has been uploaded
    loaderText.style.display = 'inline-block'; // display processing message
    Papa.parse(uploadCSV.files[0], {
        complete: function (results) { // parse success
            uploadCSV.value = ''; // clear file input
            let i = 0;
            let leadDigitsArr = [];
            results.data.map(() => {
                i++;
                const returnedData = results.data[i];
                if (typeof (returnedData) !== 'undefined') { // ignore any empty rows
                    const leadDigits = returnedData[2][0]; // isolate lead digits of column 3
                    leadDigitsArr.push(leadDigits); // store lead digits data in array
                }
            });
            loaderText.style.display = 'none'; // hide processing message
            const resultsLength = results.data.length;
            resultsLengthSpan.prepend(resultsLength); // display number of results
            const resultsNumbersArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // array of possible lead digits (1-9)
            let leadDigitPercentagesArr = [];
            resultsNumbersArr.forEach((resultNumber) => {
                const leadDigitsCount = leadDigitsArr.filter(x => x === resultNumber).length; // find occurrence of each lead digit (1-9)
                const leadDigitPercentages = ((leadDigitsCount / resultsLength) * 100).toFixed(2); // occurence of lead digit/total results to get percentage
                leadDigitPercentagesArr.push(leadDigitPercentages); // store percentages data in array
            });
            fileUploadButton.style.display = 'none'; // hide upload button
            clearDataButton.style.display = 'inline-block'; // show clear data button
            getChartData(leadDigitPercentagesArr); // push percentages values to chart array
        }
    });
}

// add percentages to chart

const getChartData = (leadDigitPercentagesArr) => {
    const percentageData = leadDigitPercentagesArr.map(Number);
    chartData.series = [];
    chartData.series = [...chartData.series, { values: percentageData }]; // push percentage data to chart configs
    const firstLeadDigit = chartData.series[0].values[0]; // get first percentage
    const differential = Math.abs(firstLeadDigit - 30).toFixed(2); // calculate raw differential
    const differentialPercentage = (differential / 30 * 100).toFixed(2); // calculate percentage of differential
    const differentialPercentageText = document.createTextNode(differentialPercentage + '%');
    resultsDifferentialSpan.appendChild(differentialPercentageText); // display differential
    let resultsConclusionSupport;
    if (differentialPercentage <= 5) {
        resultsConclusionSupport = 'supports';
    }
    else {
        resultsConclusionSupport = 'does not support';
    }
    const resultsConclusionSupportText = document.createTextNode(resultsConclusionSupport);
    resultsConclusionSupportSpan.appendChild(resultsConclusionSupportText); // display conclusion
    resultsConclusion.style.display = 'inline-block'; // show upload button
    renderChart(); // re-draw chart using percentages values
};

// draw chart

const renderChart = () => {
    zingchart.render({
        id: 'myChart',
        data: chartData,
        height: '500px',
        width: '800px'
    });
}

// Data for chart

var chartData = {
    type: 'bar',
    scaleX: {
        label: {
            text: 'Lead Digit in Town Population, 2009',
        },
        values: '1:9:1',
    },
    scaleY: {
        label: {
            text: 'Percentage of occurence',
        },
        values: '0:30:5',
    },
    plot: {
        'background-color': '#d4e6f1',
        "animation": {
            "effect": "4",
            "speed": "1000",
        },
    }
};

// draw empty chart on page load

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});