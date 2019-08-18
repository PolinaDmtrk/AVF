//Вывод входных параметров справки
export function getUnitInParams(selectedTransformID) {
	//Очищение дива с параметрами
	$('#unitInParams').empty();
	//Запрос в БД
	$.ajax ({
        url: 'common.aspx/getUnitInParameters',
        data: `{"id": ${selectedTransformID}}`,
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
			$.each(data['d'], (i, item) => {
				let param = '';
				const {paramtext, text, param_number} = item;
				//Параметр может быть и в paramtext, и в text, поэтому делаем проверку
				paramtext == '' ? param = text : param = paramtext;
				const li_item = `<li class="inParams" id="${param_number}">${param}</li>`;
				$('#unitInParams').append(li_item);
			});
		}
	});
}