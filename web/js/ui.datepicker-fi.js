/* Finnish initialisation for the jQuery UI date picker plugin. */
/* Written by Juhana Harmanen (harmanen@me.com). */
jQuery(function ($) {
    $.datepicker.regional['fi'] = {
        clearText: 'Tyhjenn&auml;', clearStatus: '',
        closeText: 'Sulje', closeStatus: 'Sulje muokkaamatta',
        prevText: '&laquo;Edellinen', prevStatus: 'Edellinen kuukausi',
        nextText: 'Seuraava&raquo;', nextStatus: 'Seuraava kuukausi',
        currentText: 'T&auml;n&auml;&auml;n', currentStatus: 'Kuluva kuukausi',
        monthNames: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kes&auml;kuu',
            'Hein&auml;kuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
        monthNamesShort: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kes&auml;',
            'Hein&auml;', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
        monthStatus: 'Kuukaudet', yearStatus: 'Vuodet',
        weekHeader: 'Vk', weekStatus: 'Viikot',
        dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
        dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'Su'],
        dayNamesMin: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
        dayStatus: 'P&auml;iv&auml;t', dateStatus: 'Valitse pv.kk.vv',
        dateFormat: 'dd.mm.yy', firstDay: 1,
        initStatus: 'Valitse p&auml;iv&auml;', isRTL: false};
    $.datepicker.setDefaults($.datepicker.regional['fi']);
});