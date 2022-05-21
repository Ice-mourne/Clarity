console.log('\x1b[32m', '-------------------------------------------------', '\x1b[0m')
const AdmZip = require('adm-zip')
const fs = require('fs')
const fse = require('fs-extra')

const params = process.argv.slice(2)[0]

// create dist and move content if its not there
;(() => {
   const filesInDist = fs.readdirSync('.')
   if (filesInDist.includes('dist')) return
   else {
      fs.mkdirSync('./dist')
      fse.copy('./devTools/dist', './dist')
   }
})()

const settings = JSON.parse(fs.readFileSync('./devTools/settings.json', 'utf8'))

// add 1 to last number in version

const versionSettings = {
   major: {
      i: 0
   },
   minor: {
      i: 1
   },
   patch: {
      i: 2
   },
   prerelease: {
      i: 3,
      prefix: '-alpha'
   }
}

if (!params === undefined || versionSettings[params] === undefined) {
   console.log('\x1b[31m', 'Invalid version type', '\x1b[0m')
   console.log('\x1b[31m', 'Valid version types: major, minor, patch, prerelease', '\x1b[0m')
   process.exit()
}

const newVersion = settings.version
   .split('.')
   .map((num, i, arr) => {
      // add version number for alpha
      if (params === 'prerelease' && i === 2 && arr.length === 3) {
         return `${num}.1`
      }
      // remove prerelease number
      if (params !== 'prerelease' && i === 3) {
         return ''
      }
      return i == versionSettings[params].i ? parseInt(num) + 1 : num
   })
   .filter(v => v !== '')
   .join('.')

const updateManifest = (manifestOverride) => {
   const fileContent = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'))
   const updatedManifest = {
      ...fileContent,
      version: newVersion,
      ...settings[manifestOverride]
   }
   fs.writeFileSync('./dist/manifest.json', JSON.stringify(updatedManifest, null, 3))
}

function zipIt() {
   const zip = new AdmZip()
   const files = fs.readdirSync('./dist')

   // update manifest
   updateManifest('chromeManifest')

   files.forEach((file) => {
      if (fs.lstatSync(`./dist/${file}`).isDirectory()) {
         zip.addLocalFolder(`./dist/${file}`, file)
      } else {
         zip.addLocalFile(`./dist/${file}`)
      }
   })

   // create folders for builds if needed
   const filesInDist = fs.readdirSync('.')
   if (!filesInDist.includes('.Clarity_builds')) {
      fs.mkdirSync('./.Clarity_builds/chrome', { recursive: true })
      fs.mkdirSync('./.Clarity_builds/fireFox')
   }

   zip.writeZip(
      `./.Clarity_builds/chrome/Clarity-A-DIM-Companion_v${newVersion}${versionSettings[params].prefix || ''}.zip`
   )
}

function zipItFirefox() {
   const zip = new AdmZip()
   const files = fs.readdirSync('./dist')

   // update manifest
   updateManifest('firefoxManifest')

   files.forEach((file) => {
      if (fs.lstatSync(`./dist/${file}`).isDirectory()) {
         zip.addLocalFolder(`./dist/${file}`, file)
      } else {
         zip.addLocalFile(`./dist/${file}`)
      }
   })

   // create folders for builds if needed
   const filesInDist = fs.readdirSync('.')
   if (!filesInDist.includes('.Clarity_builds')) {
      fs.mkdirSync('./.Clarity_builds/chrome', { recursive: true })
      fs.mkdirSync('./.Clarity_builds/fireFox')
   }

   zip.writeZip(
      `./.Clarity_builds/fireFox/Clarity-A-DIM-Companion-Fox_v${newVersion}${versionSettings[params].prefix || ''}.zip`
   )
}

function updateVersionInSettings() {
   const newSettings = {
      ...settings,
      version: newVersion
   }
   fs.writeFileSync('./devTools/settings.json', JSON.stringify(newSettings, null, 3))
}

zipItFirefox()
zipIt()
updateVersionInSettings()

console.log('Build complete!')
console.log('new version:', newVersion)
console.log('\x1b[32m', '-------------------------------------------------', '\x1b[0m')
