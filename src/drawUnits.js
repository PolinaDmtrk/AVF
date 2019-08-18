//Отрисовка справок на вебе
export function drawUnits(data) {
	//Параметр для корректной отрисовки аккордеона
	let idUnitCurrent = 0;
	//Очищение дива для справок
	$('.units ul').empty();

	$.each(data, (i, item) => {
		let {idAVF, idUnit, nameUnit, idCategory, idTransform, nameTransform} = item;
		//Если у текущего юнита id справки совпадает с предыдущим, то отрисовывается только новый шаблон
		if (idUnit == idUnitCurrent) {
			$(`#${idUnitCurrent}`).append($(`<p id="${idAVF}" class="transform">${nameTransform}</p>`));
		}
		//Отрисовывается сначала справка, затем шаблон
		else {
			$('.units ul').append($(`<li class="unit">${nameUnit}</li><li id="${idUnit}" class="unitTransform"><p id="${idAVF}" class="transform">${nameTransform}</p></li>`));
		}
		idUnitCurrent = idUnit;
	});
}