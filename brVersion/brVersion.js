//������ ��� ����������� �������� � ��� ������
//���� ���� ������� � �������� Internet Explorer, �� ������������ ��������
function msieversion() {
    var ua = window.navigator.userAgent
    var msie1 = ua.indexOf("MSIE ")
    var msie2 = ua.indexOf("rv:")

    if ( msie1 > 0 ) {
        return parseInt(ua.substring(msie1 + 5, ua.indexOf(".", msie1)))
    }
    if ( msie2 > 0 ) {
        return parseInt(ua.substring(msie2 + 3, ua.indexOf(".", msie2)))
    }
    else {
        return 0
    }

}

window.onload = function() {
    ieversion = msieversion();
    if ( ieversion < 12 && ieversion >= 3) {
        $("body").load("brVersion/brVersion.html");
    }
}
