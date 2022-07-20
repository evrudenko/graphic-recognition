const GraphicRecognizer = require('./graphic-recognition')
let graphicRecognizer = new GraphicRecognizer()

const start = async function() {
    let resOneLinePieChart = await graphicRecognizer.recognizePieChartWithOneLine('img10.png')
    console.log('img10.png', resOneLinePieChart)

    let resTwoLinesPieChart1 = await graphicRecognizer.recognizePieChartWithTwoLines('img11.png')
    console.log('img11.png', resTwoLinesPieChart1)

    let resTwoLinesPieChart2 = await graphicRecognizer.recognizePieChartWithTwoLines('img12.png')
    console.log('img12.png', resTwoLinesPieChart2)
}

start()
