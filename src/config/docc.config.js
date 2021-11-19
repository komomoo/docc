/**
 * docc 默认配置
 */

module.exports = ({ pkg } = {}) => {
  return {
    // 输入
    input: 'src/index.vue',

    // 输出
    output: {
      // 目录
      directory: './',
      // 名字
      name: 'README',
      // 模版
      template: {
        // 需要输出的模块
        api: ['props', 'events', 'methods', 'slots'],
      },
    },
  }
}
