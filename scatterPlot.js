import {
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  axisBottom,
  timeFormat,
} from 'd3';

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margin;
  let radius;

  const my = (selection) => {
    data.forEach((d) => (d.date = new Date(d.date)));

    const x = scaleTime()
      .domain(extent(data, (d) => d.date))
      .range([100, width - 50])
      .nice();

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top])
      .nice();

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));

    selection
      .selectAll('circle')
      .data(marks)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', radius);

    // TODO make it idempotent
    selection
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(y));

    selection
      .append('g')
      .attr(
        'transform',
        `translate(0,${height - margin.bottom})`
      )
      .call(axisBottom(x).ticks(6));

    selection
      .append('g')
      .attr(
        'transform',
        `translate(0,${height - margin.bottom})`
      )
      .call(axisBottom(x).ticks(6));

    selection
      .append('text')
      .attr(
        'transform',
        'translate(' +
          width / 2 +
          ' ,' +
          (margin.left - 20) +
          ')'
      )
      .attr('font-weight', 'bold')
      .attr('font-size', '18')
      .attr('fill', 'midnightblue')
      .style('text-anchor', 'middle')
      .text('UNITED STATES');

    selection
      .append('text')
      .attr(
        'transform',
        'translate(' +
          width*0.90 +
          ' ,' +
          (margin.right + 275) +
          ')'
      )
      .attr('font-weight', 'bold')
      .attr('font-size', '18')
      .attr('fill', 'red')
      .style('text-anchor', 'middle')
      .text('Vaccination @30%');

    selection
      .append('text')
      .attr(
        'transform',
        'translate(' +
          width / 2 +
          ' ,' +
          (height - margin.bottom + 80) +
          ')'
      )
      .attr('font-size', '18')
      .attr('fill', 'midnightblue')
      .style('text-anchor', 'middle')
      .text(
        'source NYT: https://github.com/nytimes/covid-19-data'
      );

    selection
      .append('text')
      .attr(
        'transform',
        'translate(' + 90 + ' ,' + (margin.left - 20) + ')'
      )
      .attr('font-weight', 'bold')
      .attr('font-size', '18')
      .attr('fill', 'midnightblue')
      .style('text-anchor', 'middle')
      .text('Deaths');

    selection
      .append('text')
      .attr(
        'transform',
        'translate(' + 90 + ' ,' + (margin.left - 45) + ')'
      )
      .attr('font-weight', 'bold')
      .attr('font-size', '20')
      .attr('fill', 'midnightblue')
      .style('text-anchor', 'middle')
      .text('COVID-19');
  };

  // accessor properties - getters and setters:
  //   functions that execute on getting and setting a value, but look like regular properties to an external code.

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  return my;
};
