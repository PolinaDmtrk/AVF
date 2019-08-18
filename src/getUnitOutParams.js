//Вывод выходных параметров справки
export function getUnitOutParams(selectedTransformID) {
	//Очищение дива с параметрами
	$('#unitOutParams').empty();
	//Запрос в БД
	$.ajax ({
        url: 'common.aspx/getUnitOutParameters',
        data: `{"id": ${selectedTransformID}}`,
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
			//Отрисовка параметров списком
			$.each(data['d'], (i, item) => {
				const li_item = `<li class="outParams" id="${item.id}">${item.name}</li>`;
				$('#unitOutParams').append(li_item);
			});
		}
	});
}