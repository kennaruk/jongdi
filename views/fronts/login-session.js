<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
  $(function () {
		if('<%= user['status'] %>' == 'log-in-failed') { //logout status
      $('#log-out-bttn').hide();
      $('#log-in-bttn').show();
      $('#register-bttn').show();
      if('<%= page %>' == 'log-in' || '<%= page %>' =='shop-log-in')
			   alert('Login failed, please try again.');
		} else if('<%= user['status'] %>' == 'log-in-success') { //login status
      $('#log-out-bttn').show();
      $('#log-in-bttn').hide();
      $('#register').hide();
      $('#hello-user').show();
    	$('#hello-user').text("Hello, <%= user['user_name'] %>");
      // if('<%= page %>' == 'home')
			//    alert('Login success');
		} else if('<%= user['status'] %>' == 'not-login') {
      $('#log-out-bttn').hide();
      $('#log-in-bttn').show();
      $('#register-bttn').show();
    }
    if('<%=user['user_status']%>' == 'user') {
      $('#user-item').show();
      $('#hello-user').show();
    	$('#hello-user').text("Hello, <%= user['user_name'] %>");
    } else if('<%=user['user_status']%>' == 'shop') {
      $('#shop-item').show();
      $('#contact').show();
      $('#hello-user').show();
    	$('#hello-user').text("Hello, <%= user['user_name'] %>");
    }
    if('<%=user['user_status']%>' != 'shop') {
      $('#menu').show();
    }
    console.log("status = "+'<%=user['status']%>');
    $('#<%=page%>').addClass("active");
  });
</script>
