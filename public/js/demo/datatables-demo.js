// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable({
    order: [[0, 'desc']],
    language: {
      emptyTable: 'Nenhum dado encontrado',
      info: 'Exibindo _START_ até _END_ de _TOTAL_ registros',
      infoEmpty: 'Exibindo 0 até 0 de 0 registros',
      infoFiltered: '(filtrando de _MAX_ total registros)',
      infoPostFix: '',
      thousands: ',',
      lengthMenu: 'Exibir _MENU_ registros',
      loadingRecords: 'Carregando...',
      processing: 'Prossessando...',
      search: 'Digite sua busca:',
      zeroRecords: 'Nenhum resultado encontrado',
      paginate: {
        first: 'Primeiro',
        last: 'Último',
        next: 'Próximo',
        previous: 'Anterior'
      }
    }
  })
})
