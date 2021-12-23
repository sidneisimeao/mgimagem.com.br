var buttonDelete = document.querySelector('.btn-delete')
var listener = buttonDelete.addEventListener('click', function (e) {
  let confirmed = confirm('Confirmar a exclusão?')
  if (confirmed) return true

  e.preventDefault()
})

buttonDelete.removeEventListener('click', listener, false)
