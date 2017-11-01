module.exports = {
  entry: [
  	'./lib/Board.js',
  	'./lib/Ball.js',
  	'./lib/Brick.js',
  	'./lib/Player.js',
  	'./lib/Vector.js',
  	'./levels/levels.js'
  ],
  output: {
    filename: 'build/bundle.js'
  },
  module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    }
	  ]
	}
};