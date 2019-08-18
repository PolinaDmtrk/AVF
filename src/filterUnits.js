import {drawUnits} from './drawUnits';

export function filterUnits(categories, prAVF) {
	//Получение всех справок из локального хранилища
	let units = JSON.parse(localStorage.getItem('units'));

	//Фильтр справок по выбранным категориям
	units = units.filter((item) => {
		return categories.some((category) => {return category == item.idCategory});
	});

	//Фильтр справок по выбранному признаку АВФ. Если признак - 2, то отображаются все справки
	if (prAVF != 2) {
		units = units.filter((item) => {
			return prAVF == item.prAVF
		});
	}

	//Отрисовка отфильтрованных справок
	drawUnits(units);
}