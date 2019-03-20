const data_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const svgWidth = 960;
const svgHeight = 450;

const sampleData = [11, 2, 23, 4, 1, 1, 8, 3]

const svg = d3.select('#svg-container')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .attr('class', 'svg-container')

svg.append('text')
   .attr('x', (svgWidth / 2))
   .attr('y', 30)
   .attr('id', 'title')
   .style('text-anchor', 'middle')
   .text('US GDP Data')

fetch(data_URL)
    .then(res => res.json())
    .then(data => {
        const scale_left = d3.scaleLinear()
                        .domain([d3.min(data.data, d => d[1]), d3.max(data.data, d => d[1])])
                        .range([0, svgHeight])
        
         const scale_bottom = d3.scaleLinear()
                        .domain([d3.min(data.data, d => d[0]), d3.max(data.data, d => d[0])])
                        .range([0, svgWidth])

        const y_axis = d3.axisLeft()
                         .scale(scale_left)

         const x_axis = d3.axisBottom()
                          .scale(scale_bottom)


        svg.append('g')
           .call(y_axis)
           .attr('id', 'y-axis');

         svg.append('g')
            .call(x_axis)
            .attr('id', 'x-axis')


      console.log(svgWidth, data.data.length)
      const barWidth = svgWidth / data.data.length;
        return svg.selectAll('rect')
                .data(data.data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('width', barWidth)
                .attr('height', d => d[1] / 45)
                .attr('x', (d, i) => i * barWidth)
                .attr('y', (d, i) => svgHeight - d[1] / 45)
                .attr('data-date', d => d[0])
                .attr('data-gdp', d => d[1])
                .append('title')
                .text(d => `${d[0]} ${d[1]}`)
                .attr('id', 'tooltip')

    })
    .catch((err) => console.log(err))

    



