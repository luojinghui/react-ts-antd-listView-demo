const { override, fixBabelImports } = require('customize-cra');

// module.exports = override(
// 	fixBabelImports('import', [
// 		{
// 			libraryName: 'antd',
// 			libraryDirectory: 'es',
// 			style: 'css'
//     },
//     {
// 			libraryName: 'antd-mobile',
// 			libraryDirectory: 'es',
// 			style: 'css'
// 		}
// 	])
// );

module.exports = override(
	fixBabelImports('import', {
			libraryName: 'antd-mobile',
			style: 'css'
		})
);
