import {selectedUnitID} from './getUnitInfo';

export function updateUnitInfo(fileName, selectedTransformID) {
	//Определение признака АВФ
	let prAVFforTr;
	$('#prAVFforTr').is(':checked') ? prAVFforTr = 1 : prAVFforTr = 0;

    let description = $('.adminForm__unitTextDescription').val();
    description = tgtrimm(description);

    //Фильтр описания, чтобы нельзя было вводить литиницу и символы < >
    function tgtrimm(str) {
        const updatedText = str.replace(/[<>a-zA-Z]/g,'');
        return updatedText;
    }

    console.log('Запущено обновление');
	// Обновление описания справки
    $.ajax ({
        url: 'common.aspx/updateUnitInfo',
        data: `{"id": ${selectedTransformID}, "description": "${description}"}`,
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
            console.log('Описание обновлено');
		},
		error: function (response) {
			console.log(`error: ${response}`);
		},
		failure: function (response) {
			console.log(`failure: ${response}`);
		}
	});
	
	//Обновление выходных параметров
	const selectedFieldIDForUpdate = [];
	$('#outParamAdminInput li').each(function (i, li) {
		selectedFieldIDForUpdate.push(`(${selectedTransformID},${li.id})`);
	});
	let selectedFieldIDForUpdateSTR = selectedFieldIDForUpdate.join(',');
    
    $.ajax ({
        url: 'common.aspx/updateUnitOutParams',
        data: `{"id": ${selectedTransformID}, "outFields": "${selectedFieldIDForUpdateSTR}"}`,
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
            console.log('Выходные параметры обновлены');
		},
		error: function (response) {
			console.log(`error: ${response}`);
		},
		failure: function (response) {
			console.log(`failure: ${response}`);
		}
	});
    
	//Обновление картинки
	if (fileName != undefined) {
        $.ajax ({
            url: 'common.aspx/updateImageData',
            data: `{"id": ${selectedTransformID}, "examplePuth": "${fileName}"}`,
            dataType: "json",
		    type: "POST",
		    contentType: "application/json; charset=utf-8",
		    success: (data) => {
                console.log('Пример обновлен');
		    },
		    error: function (response) {
			    console.log(`error: ${response}`);
		    },
		    failure: function (response) {
			    console.log(`failure: ${response}`);
		    }
	    });
	}
    
	// Обновление признака АВФ
    $.ajax ({
        url: 'common.aspx/updatePrAVF',
        data: `{"id": ${selectedTransformID}, "prAVF": "${prAVFforTr}"}`,
        dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: (data) => {
            console.log('Признак АВФ обновлен');
		},
		error: function (response) {
			console.log(`error: ${response}`);
		},
		failure: function (response) {
			console.log(`failure: ${response}`);
		}
	});

	alert('Данные обновлены!');
}