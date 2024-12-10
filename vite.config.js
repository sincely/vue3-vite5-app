import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './build/plugins'
import { proxyServer } from './build/config/proxy'
export default defineConfig(({ mode, command }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  return defineConfig({
    base: viteEnv.VITE_BASE_URL,
    server: {
      https: false, // 是否开启https
      strictPort: false, // 设为false时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      port: 3200, // 指定服务器端口
      proxy: proxyServer, // 本地跨域代理-> 代理到服务器的接口地址
      warmup: {
        // 预热的客户端文件：首页、views、 components
        clientFiles: ['./index.html', './src/{views,components}/*']
      }
    },
    build: {
      // 传递给Terser的更多 minify 选项。
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境时移除console
          drop_debugger: true // 生产环境时移除debugger
        }
      },
      modulePreload: true, // 是否动态引入polyfill，需要引入兼容性相关的文件
      emptyOutDir: true, // 默认true默认情况下，若outDir在root目录下，则Vite会在构建时清空该目录。
      assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为base64编码，以避免额外的http请求。设置为0可以完全禁用此项
      outDir: 'dist', // 指定输出路径,默认dist
      reportCompressedSize: false, // 取消计算文件大小，加快打包速度
      sourcemap: false, // 构建后是否生成 source map 文件
      assetsDir: 'assets', // 静态资源的存放目录
      cssCodeSplit: true, // 启用/禁用CSS代码拆分默认true, 用则所有样式保存在一个css里面
      brotliSize: true, // 启用/禁用brotliSize压缩大小报告
      chunkSizeWarningLimit: 1500, // chunk大小警告的限制
      minify: 'terser', // 混淆器terser构建后文件体积更小
      manifest: false, // 当设置为true，构建后将会生成 manifest.json 文件
      commonjsOptions: {}, // @rollup/plugin-commonjs 插件的选项
      // 自定义底层的Rollup 打包配置
      rollupOptions: {
        output: {
          // 指定 chunks 的入口文件模式
          entryFileNames: 'static/js/[name]-[hash].js',
          // 对代码分割中产生的 chunk 自定义命名
          chunkFileNames: 'static/js/[name]-[hash].js',
          // 自定义构建结果中的静态资源名称
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // 压缩 Rollup 产生的额外代码
          compact: true,
          // 自定义 chunk
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/styles': resolve(__dirname, 'src/styles'),
        '@/router': resolve(__dirname, 'src/router'),
        '@/views': resolve(__dirname, 'src/views'),
        '@/components': resolve(__dirname, 'src/components'),
        '@/utils': resolve(__dirname, 'src/utils'),
        '@/assets': resolve(__dirname, 'src/assets')
      },
      // 导入时想要省略的扩展名列表
      // 不建议使用.vue 影响IDE和类型支持
      // 在Vite中,不建议(实测还是可以配置的)忽略自定义扩展名，因为会影响IDE和类型支持。因此需要完整书写
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // 默认支持
    },
    define: {
      // 定义全局变量
      __APP_VERSION__: new Date().getTime()
    },
    css: {
      preprocessorOptions: {
        // 指定传递给css预处理器的选项
        less: {
          additionalData: `@import "./src/styles/variables.less";@import "./src/styles/mixin.less";`,
          javascriptEnabled: true
        }
      }
    },
    plugins: createVitePlugins(viteEnv, command === 'build'),
    // 强制预构建插件包
    optimizeDeps: {
      // force: false, // 是否强制依赖预构建
      entries: [], // 检测需要预构建的依赖项
      include: ['mitt', 'dayjs', 'axios', 'pinia', '@vueuse/core'], // 默认情况下，不在node_modules中的，链接的包不会预构建
      exclude: [] // 排除在优化之外
    }
  })
})
