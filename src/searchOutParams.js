//Поиск среди справочника выходных параметров в форме администратора
export function searchOutParams() {
    const filter = $('#searchOutP').val().toUpperCase();;
    const li = $('.outParamsAdminAll');
    $.each(li, (i, li) => {
        li.textContent.toUpperCase().indexOf(filter) > -1 ? $(li).css('display', '') : $(li).css('display', 'none');
    });
}