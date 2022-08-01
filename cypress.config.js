const { defineConfig } = require("cypress");
const GraphicRecognizer = require('../tesseract/graphic-recognition')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async recognizePieChartWithOneLine(imageUrl) {
          const graphicRecognizer = new GraphicRecognizer()
          return await graphicRecognizer.recognizePieChartWithOneLine(imageUrl)
        },
        async recognizePieChartWithTwoLines(imageUrl) {
          const graphicRecognizer = new GraphicRecognizer()
          return await graphicRecognizer.recognizePieChartWithTwoLines(imageUrl)
        },
        async recognizeChart4(imageUrl) {
          const graphicRecognizer = new GraphicRecognizer()
          return await graphicRecognizer.recognizeChart4(imageUrl)
        }
      })
    },
  },
});
