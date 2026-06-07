module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 指定如何解析语法
  parser: 'vue-eslint-parser',
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false
    }
  },

  // 继承某些已有的规则
  extends: [
    'plugin:vue/vue3-recommended', // 使用插件支持vue3
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json' // 这个是后面设置自动导入的时候用到的
  ],
  /**
   * "off" 或 0  ==>  关闭规则
   * "warn" 或 1 ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2 ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    'prettier/prettier': 'off', // 关闭 prettier 规则，允许使用其他格式化工具
    'import/extensions': 0, // 不要求导入语句中包含文件扩展名
    'prefer-template': 0, // 不强制使用模板字符串代替字符串拼接
    'no-var': 'error', // 要求使用 let 或 const 而不是 var，以避免变量提升等问题
    'no-console': 'off', // 允许使用 console 语句，方便调试
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行，最多允许一个空行
    'prefer-const': 'off', // 不强制使用 const 声明不会被重新赋值的变量
    'no-use-before-define': 'off', // 允许在定义之前使用函数、类或变量
    'no-irregular-whitespace': 'off', // 允许不规则的空白字符，如全角空格等
    'import/no-cycle': 0, // 不检查模块之间的循环依赖
    'no-nested-ternary': 0, // 允许使用嵌套的三元运算符
    'import/prefer-default-export': 0, // 不强制使用默认导出
    'import/no-unresolved': 0, // 不检查导入路径是否正确解析
    'prefer-destructuring': 0, // 不强制使用解构赋值
    'no-shadow': 0, // 允许变量名与外层作用域中的变量名相同
    'no-param-reassign': 0, // 允许修改函数参数的值
    'consistent-return': 0, // 不要求所有 return 语句返回相同的类型
    'no-case-declarations': 0, // 允许在 switch 语句的 case 中声明变量
    'prefer-promise-reject-errors': 0, // 不强制使用 Error 对象作为 Promise 拒绝的原因
    'jsx-a11y/click-events-have-key-events': 0, // 不强制为 JSX 点击事件添加键盘事件处理程序
    'jsx-a11y/no-static-element-interactions': 0, // 允许静态元素（如 div）有交互事件（如 onClick）
    camelcase: 0, // 不强制使用驼峰命名法
    'import/no-extraneous-dependencies': 0, // 不检查是否存在多余的依赖项
    'no-underscore-dangle': 0, // 允许使用下划线开头的属性名
    'no-debugger': 0, // 允许使用 debugger 语句，方便调试
    'no-promise-executor-return': 0, // 允许 Promise 构造函数的执行器返回值
    'vue/script-setup-uses-vars': 'error', // 防止 <script setup> 使用的变量在 <template> 中被标记为未使用，此规则仅在启用 no-unused-vars 规则时有效
    'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式，确保一致性
    'vue/no-mutating-props': 'off', // 允许组件内部修改 prop 的值
    'vue/no-v-html': 'off', // 允许使用 v-html 指令插入 HTML 内容
    'vue/custom-event-name-casing': 'off', // 不强制自定义事件名称的大小写风格
    'vue/attributes-order': 'off', // 不强制 Vue 组件属性的顺序
    'vue/one-component-per-file': 'off', // 不强制每个组件必须单独保存在一个文件中
    'vue/html-closing-bracket-newline': 'off', // 不要求标签右括号前换行
    'vue/max-attributes-per-line': 'off', // 不限制每行的最大属性数
    'vue/multiline-html-element-content-newline': 'off', // 不要求多行元素内容前后换行
    'vue/singleline-html-element-content-newline': 'off', // 不要求单行元素内容前后换行
    'vue/attribute-hyphenation': 'off', // 不强制模板中自定义组件属性的命名风格
    'vue/require-default-prop': 'off', // 不要求必填的 prop 必须提供默认值
    'vue/multi-word-component-names': 'off', // 不要求组件名称必须是多个单词用连字符连接
    'vue.prefer-template': 'off', // 不强制使用模板字符串代替字符串拼接
    'vuejs-accessibility/click-events-have-key-events': 'off' // 不强制为点击事件添加键盘事件处理程序
  }
}
