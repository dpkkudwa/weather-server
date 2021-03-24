$('#address').on('click', function(event) {
  event.preventDefault();
  let address = $('form input').val();
  if (!address) {
    const markup = "Please search for a valid city 😩";
    $('.msg').html(markup);
  }
  else {
    $('.msg').html('');
    let data = {
      address: address
    };
    $.ajax({
      url: '/get-weather',
      type: 'post',
      dataType: 'json',
      data: data,
      beforeSend: function () {
        $('.spinner-border').show();
      },
      success: function(response) {
        $('.spinner-border ').hide();
        $('.cities').html('');
        if (response.error) {
          $('.ajax-section').hide();
          const markup = "Please search for a valid city 😩";
          $('.msg').html(markup);
        }
        else {
          $('.ajax-section').show();
          const markup = `<h2 class="city-name" data-name="${response.location}"><span>${response.location}</span></h2><div class="city-temp">${response.data}</div>`
          $('.cities').append(markup);
        }
      }
    });
  }
});

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
  response.json().then((data) => {
    console.log(data);
  })
})
