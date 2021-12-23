let express = require('express')
let router = express.Router()
let multer = require('multer')
let fs = require('fs');
let path = require('path');

let upload = multer({
	storage: multer.diskStorage({
		//设置文件存储位置
		destination: function(req, file, cb) {
			let date = new Date();
			let year = date.getFullYear();
			let month = (date.getMonth() + 1).toString().padStart(2, '0');
			let day = date.getDate();
			let dir = "./uploads/" + year + month + day;

			//判断目录是否存在，没有则创建
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, {
					recursive: true
				});
			}

			//dir就是上传文件存放的目录
			cb(null, dir);
		},
		//设置文件名称
		filename: function(req, file, cb) {
			let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
			//fileName就是上传文件的文件名
			cb(null, fileName);
		}
	})
});

router.post('/upload', upload.single('file'), (req, res) => {
	console.log(req.file,1)
	res.json({
		file: req.file
	})
    // 	var data={
	// 	code:0,
	// 	data:{name:'aaa',pwd:'123'},
	// 	isSuccess:true,
	// 	msg:"请求成功"
	// }
	// res.json(req);
})
// router.get('/file', function(req, res, next) {
// 	var data={
// 		code:0,
// 		data:{name:'aaa',pwd:'123'},
// 		isSuccess:true,
// 		msg:"请求成功"
// 	}
// 	res.json(data);
// });
module.exports = router

