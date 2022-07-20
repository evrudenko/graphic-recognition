const tesseract = require('tesseract.js');

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

    async recognizePieChartWithOneLine(image) {
        let worker = await this.getWorker()
        const { data: { text } } = await worker.recognize(image, { rectangle: { top:70, left: 40, width: 80, height: 32 } })
        return { 'firstLine': text.trim() }
    }

    async recognizePieChartWithTwoLines(image) {
        let worker = await this.getWorker()
        const { data: { text } } = await worker.recognize(image, { rectangle: { top:65, left: 40, width: 80, height: 45 } })
        let [ firstLine, secondLine ] = text.split(/\s+/)
        return { "firstLine": firstLine, "secondLine": secondLine }
    }
}
