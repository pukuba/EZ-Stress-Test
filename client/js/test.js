const width = 500;
const height = 500;
const margin = { top: 40, left: 40, bottom: 40, right: 40 };

const data = [
  { name: 'a', value: 3074.5 },
  { name: 'b', value: 3074.5 },
  { name: 'c', value: 3074.5 },
  { name: 'd', value: 3074.5 },
  { name: 'e', value: 3074.5 },
];

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.2);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)]).nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = g => g
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom(x)
    .tickSizeOuter(0));

const yAxis = g => g
  .attr('transform', `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y))

const svg = d3.select('svg').style('width', width).style('height', height);

svg.append('g').call(xAxis);
svg.append('g').call(yAxis);
svg.append('g')
  .attr('fill', 'steelblue')
  .selectAll('rect').data(data).enter().append('rect')
  .attr('x', d => x(d.name))
  .attr('y', d => y(d.value))
  .attr('height', d => y(0) - y(d.value))
  .attr('width', x.bandwidth());

svg.node();