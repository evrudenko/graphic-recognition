const GraphicRecognizer = require('./graphic-recognition')
let graphicRecognizer = new GraphicRecognizer()

const start = async function() {
    // let img = gm('http://localhost:3000/img14.png').colorspace('gray').contrast(-3).threshold(30, true)
    // img.write('ttt.png', (err) => {})
    // img.toBuffer('PNG', (err, buff) => {
    //     img.identify((err, value) => {
    //         let str = new PNG()
    //         str.end(buff)
    //         str.on('parsed', buffer => {
    //             console.log(buffer)
    //             console.log(buffer.length, value.size.width, value.size.height, value)
    //             console.log(buffer[30640], buffer[30641], buffer[30642], buffer[30643])
    //             for (let i = 0; i < buffer.length; i+=4) {
    //                 if (buffer[i+3] != 255) {
    //                     console.log(i, buffer[i])
    //                 }
    //             }
    //         })
    //     })
    // })
        // .write('tt.png', (err) => {})
    let resOneLinePieChart = await graphicRecognizer.recognizeChart3('http://localhost:3000/img13.png',)
    console.log('result:', resOneLinePieChart)
    // let request = require('request').defaults({ encoding: null });
    // var width, height, channels
    // let image = gm('http://localhost:3000/img14.png')
    //     .colorspace('GRAY')
    //     .contrast(-3)
    //     .threshold(30, true)
    //     .size((err, value) => {
    //         width = value.width
    //         height = value.height
    //         channels = 1
    //     })
        // .identify((err, value) => {
        //     console.log(value)
        // })
        // .write('f2.png', (err) => {})
        // .toBuffer('PNG', (err, buff) => {
        //     if (err) throw err
            
        //     console.log(buff, width, height)
        //     for (var i = 0; i < buff.length; ++i) {
        //         buff[i] = 0
        //         // console.log(buff[i])
        //     }
        //     console.log('i:', i)
        // })
    // request.get('http://localhost:3000/img14.png', async function (err, res, body) {
        // let image = gm(body).grayscale().threshold(128).write('f.png')
        
        // gm(body).colorspace('gray').contrast(-3).threshold(30, true).stream(function (err, stdout, stderr) {
        //     console.log(out)
        // })
        
        // let { data, info } = await sharp(body).grayscale().threshold(128).raw().toBuffer({ resolveWithObject: true })
        // console.log('sharp:', data)
        
        // console.log(info)
        // let row, col, bgcolor, barX, barY, barWidth, barDetected = false
        // for (var i = 0; i < info.size; ++i) {
        //     if (bgcolor === undefined) {
        //         bgcolor = data[i]
        //         console.log('bgcolor: ', bgcolor)
        //     }
        //     row = Math.floor(i / info.width)
        //     col = i % info.width

        //     // detect bar
        //     if (!barDetected && col >= 215 && data[i] != bgcolor) {
        //         barX = col
        //         barY = row
        //         barDetected = true
        //         console.log('bar at', barX, barY)
        //     }
        //     // define the boundaries of the bar
        //     if (barDetected && data[i] == bgcolor) {
        //         if (row == barY && barWidth === undefined) {
        //             barWidth = col - barX
        //             console.log('width:', barWidth)
        //         }
        //         else if (col == barX) {
        //             barDetected = false
        //             barWidth = undefined
        //         }
        //     }
        //     // remove the bar pixels
        //     if (barDetected && ((barWidth !== undefined && col >= barX && col < barX + barWidth) || (barWidth === undefined && row == barY))) {
        //         data[i] = bgcolor
        //     }
        // }
        // console.log('count:', i, row, col)
        // await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).toFile('img_test_exp.png')
    // })
}

start()