/**
 * 生成 props
 */

module.exports = async (props) => {
  let str = ``

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const item = props[key]
      str += `| ${key} | ${item.desc} | ${item.type} | ${item.default} |\n`
    }
  }

  return str
}
