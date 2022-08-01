const axios = require('axios')
const sharp = require('sharp')
const tesseract = require('tesseract.js')

module.exports = class GraphicRecognizer {
    async getWorker() {
        if (typeof this._worker !== "undefined") {
            return this._worker
        }
        this._worker = tesseract.createWorker()
        await this._worker.load()
        await this._worker.loadLanguage('rus')
        await this._worker.initialize('rus')
        await this._worker.setParameters({
            tessedit_pageseg_mode: tesseract.PSM.SINGLE_BLOCK,
            tessedit_char_whitelist: '.,%0123456789',
        })
        // await worker.terminate();
        return this._worker
    }

    async recognizePieChartWithOneLine(imgUrl) {
        let worker = await this.getWorker()
        const { data: { text } } = await worker.recognize(imgUrl, { rectangle: { top:70, left: 40, width: 80, height: 32 } })
        return { 'firstLine': text.trim() }
    }

    async recognizePieChartWithTwoLines(imgUrl) {
        let worker = await this.getWorker()
        const { data: { text } } = await worker.recognize(imgUrl, { rectangle: { top:65, left: 40, width: 80, height: 45 } })
        let [ firstLine, secondLine ] = text.split(/\s+/)
        return { "firstLine": firstLine, "secondLine": secondLine }
    }

    async recognizeChart4(imgUrl, barsThreshold=215) {
        let worker = await this.getWorker()
        const filename = 'temp-test.png'
        await this._removeHorizontalBarsAndSave(imgUrl, filename, barsThreshold)
        const { data: { text } } = await worker.recognize(filename, { rectangle: { top:0, left: 215, width: 250, height: 425 } })
        return { "values": text.trim().split(/\s+/) }
    }

    async _removeHorizontalBarsAndSave(imgUrl, filename, barsThreshold) {
        let response = await axios.get(imgUrl, { responseType: 'arraybuffer' })
        let { data, info } = await sharp(response.data).grayscale().threshold(128).raw().toBuffer({ resolveWithObject: true })
        // remove bars
        let row, col, bgcolor, barX, barY, barWidth, barDetected = false
        for (var i = 0; i < info.size; ++i) {
            // define background color
            if (bgcolor === undefined) {
                bgcolor = data[i]
            }
            // calculate row and column number
            row = Math.floor(i / info.width)
            col = i % info.width
            // detect bar
            if (!barDetected && col >= barsThreshold && data[i] != bgcolor) {
                barX = col
                barY = row
                barDetected = true
            }
            // define the boundaries of the bar
            if (barDetected && data[i] == bgcolor) {
                if (row == barY && barWidth === undefined) {
                    barWidth = col - barX
                }
                else if (col == barX) {
                    barDetected = false
                    barWidth = undefined
                }
            }
            // remove the bar pixels
            if (barDetected && ((barWidth !== undefined && col >= barX && col < barX + barWidth) || (barWidth === undefined && row == barY))) {
                data[i] = bgcolor
            }
        }
        // save result
        await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).toFile(filename)
    }
}
