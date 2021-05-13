import { csv, select } from 'd3';
import { scatterPlot } from './scatterPlot';

// NY Times US rolling averages
// https://github.com/nytimes/covid-19-data/blob/master/rolling-averages/us-states.csv
// https://github.com/nytimes/covid-19-data/blob/master/rolling-averages/us.csv
const csvUrl = [
  'https://raw.githubusercontent.com/nytimes/covid-19-data/master/rolling-averages/us.csv',
].join('');


// date,geoid,cases,cases_avg,cases_avg_per_100k,deaths,deaths_avg,deaths_avg_per_100k
const parseRow = (d) => {
  d.date = d.date;
  d.geoid = d.geoid;
  d.state = d.state;
  d.cases = +d.cases;
  d.cases_avg = +d.cases_avg;
  d.cases_avg_per_100k = +d.cases_avg_per_100k;
  d.deaths = +d.deaths;
  d.deaths_avg = +d.deaths_avg;
  d.deaths_avg_per_100k = +d.deaths_avg_per_100k;
  return d;
};

console.log(parseRow);

const width = window.innerWidth;
const height = window.innerHeight;
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const main = async () => {
  svg.call(
    scatterPlot()
      .width(width)
      .height(height)
      .data(await csv(csvUrl, parseRow))
      .xValue((d) => d.date)
      .yValue((d) => d.deaths_avg)
      .margin({
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      })
      .radius(1)
  );
};
main();
