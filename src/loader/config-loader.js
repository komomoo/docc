/**
 * 配置文件加载器
 */

const fs = require('fs')
const merge = require('lodash/merge')

module.exports = (cwd = process.cwd(), pkg, cliConfig) => {
  const defaultConfig = require('../config/docc.config.js')({ pkg })

  const configPath = `${cwd}/docc.config.js`

  if (fs.existsSync(configPath)) {
    let config = require(configPath)
    if (typeof config === 'function') config = config({ pkg, defaultConfig })
    return merge(defaultConfig, config)
  } else if (pkg.doccConfig) {
    return merge(defaultConfig, pkg.doccConfig)
  } else {
    if (cliConfig.debug) console.warn('未找到 docc 配置，将使用默认配置构建...')
    return defaultConfig
  }
}
