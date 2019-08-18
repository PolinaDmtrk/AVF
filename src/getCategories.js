//Получение категорий из БД и отрисовка их на вебе
import {getUnits} from './getUnits';

export function getCategories() {
	return new Promise((resolve, reject) => {
		$.ajax ({
			url: 'common.aspx/getCategories',
			data: '',
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: (data) => {
				$.each(data['d'], (i, item) => {
					const li_item = `<li><label><input name="category" class="category" value="${item.id}" type="checkbox" checked>${item.FullName}</label></li>`;
					$('#categories ul').append(li_item);
				});
				resolve('result');
			},
			error: function (response) {
				alert(`error: ${response}`);
			},
			failure: function (response) {
				alert(`failure: ${response}`);
			}
		});
	});
}