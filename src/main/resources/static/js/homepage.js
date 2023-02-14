function upload() {
	var file = $('#file')[0].files[0]
	// var file = document.getElementById('#file')[0].files[0]
	var formData = new FormData()
	formData.append('userfile', file)
	console.log(formData.get('userfile'))
	$.ajax({
		url: '/setFile',
		type: 'post',
		data: formData,
		async: 'false',
		dataType: 'json',
		processData: false,
		cache: false,
		contentType: false,
		success: function (data) {
			alert(data.msg)
			// console.log(data)
			if (data.flag) {
				window.location.href = '/index'
			}
		},
	})
}

function handleFiles() {
	const fileName = document.getElementById('file').files[0].name
	document.querySelector('.fileField').innerHTML = fileName
	// console.log(fileName)
}

let app = new Vue({
	el: '#app',
	data() {
		return {
			screenWidth: document.body.clientWidth,
			mobile_left: '',
			mobile_content: '',
			username: '',
			show: '',
			filesTable: [],
			myFiles: [],
			userStatus: [],
			// 分页
			currentPage: 1,
			pageSize: 7,
			total: 100,
			// filter
			uploadId: 0,
			userId: 1,
		}
	},
	filters: {
		admin(val) {
			return ['是', '否'][val]
		},
		status(val) {
			return ['否', '是'][val]
		},
	},
	mounted() {
		this.changeDevice()
		this.getUserName()
		this.getFilesList()
		this.getMyFiles()
		this.getUserStatus()
		// 分页
		this.currentChange(this.currentPage)
		this.getListFile(this.currentPage)
	},

	methods: {
		getRowClass({ row, column, rowIndex, columnIndex }) {
			return 'background:#57606f60;border:none;color:#fff'
		},
		change1() {
			this.show = '1'
		},
		change2() {
			this.show = '2'
		},
		change3() {
			this.show = '3'
		},
		changeDevice() {
			if (this.screenWidth <= 500) {
				this.mobile_left = 'xs'
				this.mobile_content = 'xs'
			}
		},
		showHideLeftMenu() {
			this.mobile_left == ''
				? (this.mobile_left = 'xs')
				: (this.mobile_left = '')
			if (this.screenWidth > 500) {
				this.mobile_content == ''
					? (this.mobile_content = 'xs')
					: (this.mobile_content = '')
			}
		},
		// 上传文件
		upload() {
			var file = $('#file')[0].files[0]
			console.log(file)
			var formData = new FormData()
			formData.append('userfile', file)
			axios({
				url: '/setFile',
				method: 'post',
				data: formData,
			}).then((res) => {
				alert(res.data.msg)
				if (res.data.flag) {
					window.location.href = '/index'
				}
			})
		},
		// 获取用户名
		getUserName() {
			axios({
				url: '/getUser',
				method: 'post',
			}).then((res) => {
				this.username = res.data.obj.name
			})
		},
		// 获取共享大厅文件
		getFilesList() {
			axios({
				url: '/getFiles',
				method: 'post',
			}).then((res) => {
				if (res.data.flag) {
					console.log(res.data)
					this.filesTable = res.data.obj
					// 是否是管理员
					this.userId = res.data.msg.split(':')[1]
					// 当前用户ID
					this.currentId = res.data.msg.split(':')[0]
				} else {
					alert('数据获取失败！')
				}
			})
		},
		// 获取我的文件
		getMyFiles() {
			axios({
				url: '/getMyFiles',
				method: 'post',
			}).then((res) => {
				if (res.data.flag) {
					// console.log(res.data)
					this.myFiles = res.data.obj
				} else {
					alert('数据获取失败！')
				}
			})
		},
		// 用户列表
		getUserStatus() {
			axios({
				url: '/inline',
				method: 'post',
			}).then((res) => {
				if (res.data.flag) {
					// console.log(res.data)
					this.userStatus = res.data.obj
				} else {
					alert('数据获取失败！')
				}
			})
		},
		// 删除文件
		deleteFile(id) {
			axios({
				url: '/delFile',
				method: 'post',
				params: {
					id: id,
				},
			}).then((res) => {
				console.log(id)
				alert(res.data.msg)
				if (res.data.flag) {
					window.location.href = '/index'
				}
			})
		},
		// 下载文件
		saveFile(id) {
			window.location.href = '/saveFile?id=' + id
		},
		// 分页
		getListFile(pageNo) {
			axios({
				url: '/getFilePage',
				method: 'get',
				params: {
					pageNo,
					pageSize: this.pageSize,
				},
			}).then((res) => {
				console.log(res)
				this.filesTable = res.data.obj
				// this.myFiles = res.data.obj
				this.total = Number(res.data.msg)
				// console.log(this.total)
			})
		},
		// 获取当前页
		currentChange(val) {
			console.log('第' + val + '页')
			this.currentPage = val
			this.getListFile(val)
		},
		// 退出登录
		exit() {
			axios({
				url: '/layout',
				method: 'post',
			}).then((res) => {
				alert(res.data.msg)
				if (res.data.flag) {
					window.location.href = '/login'
				}
			})
		},
	},
})
