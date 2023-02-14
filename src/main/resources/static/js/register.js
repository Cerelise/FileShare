function check() {
	let username = $('#name').val()
	let password = $('#password').val()
	let password2 = $('#password2').val()
	if (username.length == 0 || password.length == 0 || password2.length == 0) {
		alert('表单尚未填写完整!')
		return
	}
	if (password != password2) {
		alert('两次密码不一致!')
		return
	}
	if (password.length < 8) {
		alert('密码太短!')
		return
	}
	$.ajax({
		url: '/check',
		data: { name: $('#name').val(), password: $('#password').val() },
		type: 'post',
		async: 'false',
		dataType: 'json',
		success: function (data) {
			alert(data.msg)
			if (data.flag) {
				window.location.href = '/login'
			}
		},
	})
}
function toLogin() {
	window.location.href = '/login'
}
