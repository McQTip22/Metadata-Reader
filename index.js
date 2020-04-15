var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

var upload = multer({ dest: '/api/uploads' });

// var fileRoutes = require('./routes/files');

//File upload with multer
app.post('/api/uploads', upload.single('myFile'), (req, res, next) => {
	const file = req.file;
	if (!file) {
		const error = new Error('Please upload a file');
		error.httpStatusCode = 400;
		return next(error);
	}
	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	});
});

// Routes
app.get('/', function(req, res) {
	res.sendFile('index.html');
});

// app.use('/api/files', fileRoutes);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
