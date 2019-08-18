export let selectedUnitID = 0;
//Вывод основной информации юнита и вывод примера
export function getUnitInfo(selectedTransformID) {

	//Очищений полей перед записью
	$('#unitTextDescription').empty();
	$('.example').empty();

	//Запрос в БД
	$.ajax ({
        url: 'common.aspx/getUnitInfo',
        data: `{"id": ${selectedTransformID}}`,
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
			const {description, example} = data['d'][0];

			//Отображение описания справки
			$('#unitTextDescription').append(description);

			//Если есть пример, он отрисовывается
			if (example != '') {
				$('.example').append($('<img class="imgExample" src="img/'+example+'"></img>'));
			}
			else {
				console.log('Примера нет');
			}
		}
	});		
}