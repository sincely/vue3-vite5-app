import * as antdIcons from '@ant-design/icons-vue'
// 全局注册antd图标
export default function setupIcon(app) {
  Object.keys(antdIcons).forEach((key) => {
    app.component(key, antdIcons[key])
  })
}
