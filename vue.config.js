module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false,
	configureWebpack:{
		resolve:{
			alias:{//配置路径别名
				assets: "@/assets",
				components: "@/components",
				views: "@/views",
				network: "@/network",
				router:'@/router',
				store:'@/store',
				excel:'@/excel'
			}
		}
	},
	pwa:{
		iconPaths: {
            favicon32: 'logo.ico',
            favicon16: 'logo.ico',
            appleTouchIcon: 'logo.ico',
            maskIcon: 'logo.ico',
            msTileImage: 'logo.ico'
       }
	},
	devServer: {
//	  proxy: {
//	    '/api': {
//	      target: 'http://da.api.tianchic.com/admin.php',
//	      ws: true,
//	      changeOrigin: true,
//	      pathRewrite: {
//	        '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
//	      }
//	    }
//	  }
	}
}