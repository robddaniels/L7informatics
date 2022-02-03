# Benford's Law

A web-based prototype for parsing a .csv file and displaying the resulting data as a bar chart

## Description

In 1938, American engineer Frank Benford demonstrated that, given large pools of numerical data, the number 1 was the leading digit in approximately 30% of the data. Given the example of a US census from 2009, the application aims to put Benford's assertion to the test.

### Executing program

To launch the application, open index.html in a browser. Using the "Select .csv file" button, select census_2009b.csv from the root directory.

### How it works

The application makes use of two JavaScript libraries: Papa Parse (an in-browser CSV parser) and ZingChart. The Papa Parse library coverts the .csv data into DOM-accessible JSON data. Zingchart converts JSON to a chart display with numerous configuration options.

The file js/scripts.js leverages the two libraries to process the .csv file, store the desired data where it can be accessed by the chart configs, then display the data in chart form. It also provides the option to clear all data and results should the user wish to upload the .csv file again.

If the resulting data is within 5% of Benford's 30% assertion, the outputted text confirms that Benford's Law has been supported.

## Authors

Rob Daniels 
robertdaniels047@gmail.com

## Version History

* 1.0.0
    * Initial Release

## Acknowledgments

* [Papa Parse](https://www.papaparse.com/)
* [Zingchart](https://www.zingchart.com/
* [MDN Web Docs](https://developer.mozilla.org/)
