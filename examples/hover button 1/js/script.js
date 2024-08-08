$('.targetDiv').hide();
$('.show').click(function () {
    $('.targetDiv').hide();
    $('.div0').hide();
    $('#div' + $(this).attr('target')).show();
});

$('.hide').click(function () {
    $('.targetDiv').hide();
    $('.div0').show();

});
