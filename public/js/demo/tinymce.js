// Call the dataTables jQuery plugin
$(document).ready(function () {
  tinymce.init({
    selector: '#description',
    toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist',
    menubar: 'edit view insert table',
    plugins: [
      'advlist autolink link image lists charmap print preview hr anchor',
      'table template paste'
    ]
  })
})
