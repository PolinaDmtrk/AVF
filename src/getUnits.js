import {drawUnits} from './drawUnits';
//Выборка всех справок из БД 
export function getUnits(prAVF) {
	$.ajax ({
		url: 'common.aspx/getUnits',
		data: '',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
            const units = [];
			//Очистка локального хранилища
			localStorage.clear();
			//Перезапись справок в массив объектов в необходимом формате
			$.each(data['d'], (i, item) => {
				let {idAVF, idUnit, nameUnit, idCategory, nameTransform, prAVF} = item;
				//Если у справки нет шаблона, то вместо имени шаблона указывается имя справки
				if (nameTransform == '') {
					nameTransform = nameUnit;
				}
				units.push({
					'idAVF': idAVF,
					'idUnit': idUnit,
					'nameTransform': nameTransform,
					'nameUnit': nameUnit,
					'idCategory': idCategory,
					'prAVF': prAVF
				});
			});
			//Отрисовка справок на вебе
			drawUnits(units);
			//Запись массива справок в локальное хранилище
			localStorage.setItem('units', JSON.stringify(units));
		},
		error: function (response) {
			alert(`error: ${response}`);
		},
		failure: function (response) {
			alert(`failure: ${response}`);
		}
	});
}