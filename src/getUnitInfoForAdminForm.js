//Добавление данных в форму администратора
export function getUnitInfoForAdminForm() {
	//Добавление названия справки
	$('#unitNameAdmin').empty();
	$('#unitNameAdmin').append($('#unitName')[0].textContent);
	
	// Добавление текущего описания шаблона
	$('.adminForm__unitTextDescription').val($('#unitTextDescription').text());
		
	//Добавление текущих выходных параметров
	$('#outParamAdminInput ul').empty();
	$('#unitOutParams li').each(function() {
		const li_admin = `<li id="${this.id}" class="outParamsAdmin">${this.textContent}</li>`;
		$('#outParamAdminInput ul').append(li_admin);
	});
}