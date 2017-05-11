<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
  $(function () {
		if('<%= user['status'] %>' == 'log-in-failed') { //logout status
      $('#log-out-bttn').hide();
      $('#log-in-bttn').show();
      $('#register-bttn').show();
      if('<%= page %>' == 'log-in')
			   alert('Login failed, please try again.');
		} else if('<%= user['status'] %>' == 'log-in-success') { //login status
      $('#log-out-bttn').show();
      $('#log-in-bttn').hide();
      $('#register').hide();
      // if('<%= page %>' == 'home')
			//    alert('Login success');
		} else if('<%= user['status'] %>' == 'not-login') {
      $('#log-out-bttn').hide();
      $('#log-in-bttn').show();
      $('#register-bttn').show();
    }
    console.log("status = "+'<%=user['status']%>');
  });
</script>
