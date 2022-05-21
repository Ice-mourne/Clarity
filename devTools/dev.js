console.log('\x1b[32m', '-------------------------------------------------', '\x1b[0m')
const fs = require('fs')

const files = fs.readdirSync('./dist')

function deleteOldFiles(excludedFiles) {
   const files = fs.readdirSync('./.clarity_builds/Clarity_WIP')
   files.forEach((file) => {
      if (file.match(new RegExp(excludedFiles))) return
      fs.unlinkSync(`./.clarity_builds/Clarity_WIP/${file}`)
      fs.unlinkSync(`./.clarity_builds/Clarity_WIP_Firefox/${file}`)
   })
}

function copyNewFiles() {
   files.forEach((file) => {
      fs.copyFileSync(`./dist/${file}`, `./.clarity_builds/Clarity_WIP/${file}`)
      fs.copyFileSync(`./dist/${file}`, `./.clarity_builds/Clarity_WIP_Firefox/${file}`)
   })
}

// move new files
const excludeFromDeletion = [
   'manifest.json',
   'clarityLogo.png',
   'serviceWorker.js'
].join('|')
deleteOldFiles(excludeFromDeletion)
copyNewFiles(files)

// remove export it will cause error
const clarity = fs.readFileSync('./.clarity_builds/Clarity_WIP/clarity.es.js', 'utf8')
const updatedClarity = clarity.replace(/(export { clarity };)/, '')
fs.writeFileSync('./.clarity_builds/Clarity_WIP/clarity.es.js', updatedClarity)
fs.writeFileSync('./.clarity_builds/Clarity_WIP_Firefox/clarity.es.js', updatedClarity)

console.log('Build complete!')
console.log('\x1b[32m', '-------------------------------------------------', '\x1b[0m')
