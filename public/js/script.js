$('#end_here').on('click', function() {
    if ($(this).is(':checked')) {
        $('#choice_text').prop('disabled', true);
        $('#required_item').prop('disabled', true);
        $('#choice_text_2').prop('disabled', true);
        $('#required_item_2').prop('disabled', true);
        $('#choice_text_3').prop('disabled', true);
        $('#required_item_3').prop('disabled', true);
    } else {
        $('#choice_text').prop('disabled', false);
        $('#required_item').prop('disabled', false);
        $('#choice_text_2').prop('disabled', false);
        $('#required_item_2').prop('disabled', false);
        $('#choice_text_3').prop('disabled', false);
        $('#required_item_3').prop('disabled', false);
    }
});