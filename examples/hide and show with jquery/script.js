$('.targetDiv').hide();
$('.show').click(function () {
    $('.targetDiv').hide();
    $('#div' + $(this).attr('target')).show();
});

$('.hide').click(function () {
    $('.targetDiv').hide();

});
