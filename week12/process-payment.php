<?php
  session_start();
  
  require('./modules/utils.php');

  $reqMethod = $_SERVER["REQUEST_METHOD"];
  if ($reqMethod !== "POST") {
    endWithMessage(400, "Invalid request method \"$reqMethod\"");
  }


  // endWithJSONObject(200, $_SESSION);
  redirect("./result.php");
?>