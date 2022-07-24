const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(express.static(path.join(__dirname, 'static')))

app.listen(port)

// const GraphicRecognizer = require('./graphic-recognition')
// let graphicRecognizer = new GraphicRecognizer()

// const start = async function() {
//     let resOneLinePieChart = await graphicRecognizer.recognizePieChartWithOneLine('img10.png')
//     console.log('img10.png', resOneLinePieChart)

//     let resTwoLinesPieChart1 = await graphicRecognizer.recognizePieChartWithTwoLines('img11.png')
//     console.log('img11.png', resTwoLinesPieChart1)

//     let resTwoLinesPieChart2 = await graphicRecognizer.recognizePieChartWithTwoLines('img12.png')
//     console.log('img12.png', resTwoLinesPieChart2)
// }

// start()
