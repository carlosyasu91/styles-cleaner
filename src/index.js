const fs = require('fs')
const Promise = require('bluebird')
const _ = require('underscore')

const readFile = Promise.promisify(fs.readFile)

readFile('./src/Component.jsx').then((rawComponent) => {
  const component = rawComponent.toString()
  const classesRegExp = /className\=[\"'].*[\"\']/gi
  const classesInJSX = []
  component.replace(classesRegExp, (classAttr) => {
    const classRaw = classAttr.split('=')[1]
    classesInJSX.push(classRaw.slice(1, classRaw.length-1).split(' '))
  })
  console.log(_.flatten(classesInJSX))
})

readFile('./src/styles.css').then((rawStyles) => {
  const styles = rawStyles.toString()
  const wordsRegExp = /\w+/gi
  const words = styles.match(wordsRegExp)
  console.log(words)
})
