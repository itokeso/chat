$(function(){

  
    function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
        <div class="lower-message">
        <p class="lower-message__content">
          ${message.content }
        </p>
        </div>
          <img src=${message.image}>
        </div>`
        return html
    } else {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
        <div class="upper-message__user-name">
        ${message.user_name}
        </div>
        <div class="upper-message__date">
        ${message.created_at}
        </div>
        <div class="lower-message">
        <p class="lower-message__content">
        ${message.content }
        </p>
      </div>`
      return html;
    }
  }
  $("#new_message").on('submit',function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__content__message').append(html);
      $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__footer__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("error")
    })
  });
    
    var reloadMessages = function(){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function(messages){
        if (messages.length !== 0){
        var insertHTML = "";
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chat-main__content__message').append(insertHTML)
        $('.chat-main__content').animate({ scrollTop: $('.chat-main__content')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    }
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
  }
});

