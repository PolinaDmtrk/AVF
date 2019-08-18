import {getCategories} from './getCategories';
import {getUnits} from './getUnits';
import {getUnitInfo} from './getUnitInfo';
import {getUnitInParams} from './getUnitInParams';
import {getUnitOutParams} from './getUnitOutParams';
import {searchUnits} from './searchUnits';
import {getAllOutParams} from './getAllOutParams';
import {searchOutParams} from './searchOutParams';
import {getUnitInfoForAdminForm} from './getUnitInfoForAdminForm';
import {updateUnitInfo} from './updateUnitInfo';
import {filterUnits} from './filterUnits';


$(document).ready ( () => {
	//Id выбранного шаблона
	let selectedTransformID = 0;
	//Признак АВФ
	let prAVF = $('#AVFparameter select option:selected').attr('id');
	//Параметр для определения, впервые ли открывается форма администратора
	let paramForAllParams = 0;

	//Получение категорий из БД, а затем запуск функции получения спика справок из БД
	getCategories().then(result => {getUnits(prAVF)})
				   .catch(error => {console.log(error)});
	
	//Получение выбранных категорий
	function getSelectedCategories() {
		const categories = [];
		$('.category:checked').each( function() {
			categories.push($(this).val());
		});
		return categories;
	}

	//Фильтр справок при смене категорий
	$('#categories').on('change', '.category', () => {
		const categories = getSelectedCategories();
		filterUnits(categories, prAVF);
	});

	//Фильтр справок при смене признака АВФ
	$('#AVFparameter').on('change', () => {
		prAVF = $('#AVFparameter select option:selected').attr('id');
		const categories = getSelectedCategories();
		filterUnits(categories, prAVF);
	});

	// Аккордеон со справками
	$('.units').on('click', '.unit', function() {
		if($(this).next('li').is(':visible')){
			$(this).next('li').slideUp('slow');
		}
		else {
			$('.unitTransform').slideUp('slow');
			$(this).next('li').slideToggle('slow');
		}	
	});

	//Отображение окна с описанием при выборе шаблона
	$('.units').on('click', '.transform', function() {
		//Фиксируеся идентификатор выбранного шаблона
		selectedTransformID = $(this).attr('id');

		//Очищение поля для описания
		$('#unitName').empty();

		//Отображение названия справки
		const unitName = $(this).parent('li').prev()[0].textContent;
		const transformName = $(this)[0].textContent;
		$('#unitName').append(unitName);
		//Если название шаблона отличается от названия справки, то оно добавляется дополнительно 
		if (transformName != unitName) {
			$('#unitName').append(` / ${transformName}`);
		}
		
		//Вывод информации по справке
		//Вывод основной информации справки и вывод примера
		getUnitInfo(selectedTransformID);
		//Вывод входных параметров справки
		getUnitInParams(selectedTransformID);
		//Вывод выходных параметров справки
		getUnitOutParams(selectedTransformID);
		//Отображение окна с описанием
		$('.unitDescription').css('display','block');
	});

	//Поиск справок по названию
	$('#unitSearch').on('input', () => {
		searchUnits();
	});

	// Отображение модального окна с увеличенной картинкой
	$('.exampleOut').on('click', '.imgExample', function() {
		//Указание ссылки на картинку
		$('#modalImg')[0].src = this.src;
		//Определение размеров монитора для корректного отображения
		const displaySizeDifference = $(window).width() / $(window).height();
		$('#modalImg').css({'height': 'auto', 'width': 'auto'});
		//Установка размеров картинки
	    this.height * displaySizeDifference > this.width ? $('#modalImg').css('height','85vh') : $('#modalImg').css('width','90vw');
	    //Отображение картинки
	    $('.modalForImage').css('display', 'block');
	});

	// Отображение модального окна с формой администратора
	$('.update').on('click', () => {
		//Если окно открывается впервые, то происходит загрузка справочника параметров
		if (paramForAllParams == 0) {
	    	getAllOutParams();
	    	paramForAllParams = 1;
		}
	    $('.modalForAdminForm').css('display','block');
	});

	//Закрытие модального окна
	$('.close').on('click', () => {
		$('.modalForImage').css('display','none');
		$('.modalForAdminForm').css('display','none');
	});

	//Передача всей информации по справке в форму администратора при нажатии на кнопку "Обновить"
	$('.unitDescription').on('click', '.update', () => {
		getUnitInfoForAdminForm()
	});

	//Форма администратора:

	//Поиск среди выходных параметров
	$('#searchOutP').on('input', () => {
		searchOutParams();
	});

	//Добавление выходных параметров
	$('#outParamAdminOutput ul').on('click', '.outParamsAdminAll', function() {
		const li_item = `<li id="${this.id}" class="outParamsAdmin">${this.textContent}</li>`;
		$('#outParamAdminInput ul').append(li_item);
	});

	//Удаление выходных параметров
	$('#outParamAdminInput ul').on('click', '.outParamsAdmin', function() {
		$(this).remove();
	});

    //Изменение порядка выходных параметров
	$('#outParamAdminInput ul').sortable();
	
	//Получение данных по выбранному файлу, при изменении значения поля file
	let fileName;
	$('input[type=file]').on('change', function() {
		fileName = this.files[0]['name'];
	});

	//Обновление данных шаблона в БД
	$('.button_update').on('click', () => {
		updateUnitInfo(fileName, selectedTransformID);
	});
})