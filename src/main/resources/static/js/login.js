function login() {
	let username = $('#name').val()
	let password = $('#password').val()
	if (username.length == 0 || password.length == 0) {
		alert('表单尚未填写完整!')
		return
	}
	$.ajax({
		url: '/loginpost',
		data: { name: $('#name').val(), password: $('#password').val() },
		type: 'post',
		async: 'false',
		dataType: 'json',
		success: function (data) {
			// console.log(data)
			alert(data.msg)
			if (data.flag) {
				window.location.href = '/index'
			}
		},
	})
}
function toRegister() {
	window.location.href = '/register'
}
