const axios = require('axios')
const sharp = require('sharp')
const tesseract = require('tesseract.js')

module.exports = class GraphicRecognizer {
    async _getWorker() {
        if (typeof this._worker !== 'undefined') {
            return this._worker
        }
        this._worker = tesseract.createWorker()
        await this._worker.load()
        await this._worker.loadLanguage('eng')
        await this._worker.initialize('eng')
        await this._worker.setParameters({
            tessedit_pageseg_mode: tesseract.PSM.SINGLE_BLOCK,
            tessedit_char_whitelist: '.,%0123456789',
        })
        // await worker.terminate();
        return this._worker
    }

    async _removeHorizontalBars(image) {
        return new Promise(async (resolve) => {
            let { data, info } = await image.raw().toBuffer({ resolveWithObject: true })
            // remove bars
            let row, col, bgcolor, barX, barDetected = false, rowClear = false
            for (var i = 0; i < info.size; ++i) {
                // define background color
                if (bgcolor === undefined) {
                    bgcolor = data[i]
                }
                // calculate row and column number
                row = Math.floor(i / info.width)
                col = i % info.width
                // detect bar
                if (data[i] != bgcolor) {
                    if (!barDetected) {
                        barX = col
                        barDetected = true
                        rowClear = false
                    }
                    else if (col == barX) {
                        rowClear = false
                    }
                }
                // define the boundaries of the bar
                if (barDetected && data[i] == bgcolor) {
                    if (col > barX) {
                        rowClear = true
                    }
                    else if (col == barX) {
                        barDetected = false
                    }
                }
                // remove the bar pixels
                if (barDetected && !rowClear) {
                    data[i] = bgcolor
                }
            }
            resolve( sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }) )
        })
    }

    _prepareInput(imageData, targetRectangle, magnify=false, magnificationFactor=2, threshold=128) {
        let image = sharp(imageData).extract(targetRectangle)
        if (magnify) {
            image = image.resize(targetRectangle.width*magnificationFactor, targetRectangle.height*magnificationFactor)
        }
        return image.grayscale().normalize().threshold(threshold)
    }

    async recognizePieChartWithOneLine(imgUrl) {
        let worker = await this._getWorker()
        const { data: { text } } = await worker.recognize(imgUrl, { rectangle: { top:70, left: 40, width: 80, height: 32 } })
        return { 'firstLine': text.trim() }
    }

    async recognizePieChartWithTwoLines(imgUrl) {
        let worker = await this._getWorker()
        const { data: { text } } = await worker.recognize(imgUrl, { rectangle: { top:65, left: 40, width: 80, height: 45 } })
        let [ firstLine, secondLine ] = text.split(/\s+/)
        return { 'firstLine': firstLine, 'secondLine': secondLine }
    }

    async recognizeChart3(imgUrl) {
        let worker = await this._getWorker()
        const filename = 'temp-test.png'
        const response = await axios.get(imgUrl, { responseType: 'arraybuffer' })
        const values = []

        // Get left value
        await this._prepareInput(response.data, { top:87, left: 44, width: 50, height: 22 }, true).toFile(filename)
        let result = await worker.recognize(filename)
        values.push(result.data.text.trim())

        // Get right values
        let image = this._prepareInput(response.data, { top:45, left: 130, width: 370, height: 115 }, true, 2, 107)
        image = await this._removeHorizontalBars(image)
        await image.toFile(filename)
        result = await worker.recognize(filename)
        values.push(...result.data.text.trim().split(/\s+/))

        return { 'values': values }
    }

    async recognizeChart4(imgUrl) {
        let worker = await this._getWorker()
        const filename = 'temp-test.png'
        let response = await axios.get(imgUrl, { responseType: 'arraybuffer' })
        let image = this._prepareInput(response.data, { top:0, left: 215, width: 250, height: 425 }, false)
        image = await this._removeHorizontalBars(image)
        await image.toFile(filename)
        const { data: { text } } = await worker.recognize(filename)
        return { 'values': text.trim().split(/\s+/) }
    }
}
