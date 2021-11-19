/**
 * 生成文档
 */

const path = require('path')
const fs = require('fs')

module.exports = async (cliConfig) => {
  const pkg = pkgLoader()
  const config = configLoader(process.cwd(), pkg, cliConfig)

  if (cliConfig.debug) {
    console.log('\npkg: ', pkg)
    console.log('\ndioConfig: ', config)
  }

  if (!fs.existsSync(dioConfig.output.directory)) fs.mkdirSync(dioConfig.output.directory)

    const spinner = ora(`🍉  Generating ${config.input} → ${config.output.name}.md`).start()

    spinner.succeed()
}

const target = path.resolve(__dirname, `../../src/lib/SlimPopup/index.vue`)
const docsPath = path.resolve(__dirname, `../../README.md`)

_init()

async function _init () {
  const props = await propsParse(target)
  const table = tableCreate(props)
  write(docsPath, table)
}

// 解析 props
async function propsParse (filePath) {
  try {
    const res = await readFile(filePath, 'utf8')

    // const re = /(?<=props: \{)\s+([a-z]+):\s*\{\s+\/\/\s*([^\n]+)\s+type:\s*([a-z|A-Z]+),\s+default:\s*([^,]+),\s+\}.+(?=data)/us

    const rePorps = /(?<=props:\s*).+(?=,\s*data)/su

    const propsStr = res.split()[0].match(rePorps)[0]

    let props
    eval('props =' + propsStr) // eslint-disable-line

    const reDesc = /(?<=\{\s+\/\/\s+)[^\n]+(?=[^}]+\})/gus
    const descs = propsStr.match(reDesc)

    Object.values(props).forEach((item, index) => {
      item.type = item.type.name
      item.desc = descs[index]
    })

    return props
  } catch (e) {
    console.error(`[propsParse] ${e}`)
  }
}

// 写文件
async function write (target, content) {
  try {
    await stat(target)
    console.log('目标文档文件已存在，追加写入...')
    await appendFile(target, '\n' + content)

    console.log('✨ 生成成功！')
  } catch (e) {
    if (e.errno === -2) {
      console.log('目标文档文件不存在，生成新文件写入...')
      try {
        const res = await readFile(template, 'utf8')
        const data = res.replace(/Name/g, name).replace(/\{\{props\}\}/, content)

        await appendFile(target, data)

        console.log('✨ 生成成功！')
      } catch (e) {
        console.error(e)
      }
    } else {
      console.error(e)
    }
  }
}
