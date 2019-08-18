export function getAllOutParams() {
	$.ajax ({
        url: 'common.aspx/getAllOutParameters',
        data: '',
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
			$.each(data['d'], (i, item) => {
				const li_item = `<li id="${item.id}" class="outParamsAdminAll">${item.name}</li>`;
				$('#outParamAdminOutput ul').append(li_item);
			});
		}
	});
}