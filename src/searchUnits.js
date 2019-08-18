//Функция совершает поиск среди юнитов по названию
export function searchUnits() {
    const filter = $('#unitSearch').val().toUpperCase();
    const li = $('.unit');
    const liInside = $('.unitTransform');
    //Проверяем каждый юнит на соответствие
    $.each(li, (i, li) => {
        if (li.textContent.toUpperCase().indexOf(filter) > -1) {
            //Если соответствует, то юнит отображается (все шаблоны скрываются)
            li.style.display = '';
            liInside[i].style.display = 'none';
        }
        else {
            li.style.display = 'none';
            liInside[i].style.display = 'none';
        }
    });
}