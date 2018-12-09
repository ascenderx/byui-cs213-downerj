<?php
  session_start();
  
  require("./modules/utils.php");

  $reqMethod = $_SERVER["REQUEST_METHOD"];
  if ($reqMethod !== "POST") {
    endWithMessage(400, "Invalid request method \"$reqMethod\"");
  }

  $REGEX_MAP = array(
    "first-name" => "/^.+$/",
    "last-name" => "/^.+$/",
    "address-street" => "/^[\w\s\/\-\.]+$/",
    "address-2" => "/^.*$/",
    "address-city" => "/^[\w\s\-\.]+$/",
    "address-state" => "/^[A-Z]{2}$/",
    "address-zip" => "/^(\d){5}(\-(\d){4})?$/",
    "phone-number" => "/^(\+?1[\-\s]?)?(((\d{3}[\-\s]?)|(\(\d{3}\)[\s]?))\d{3}[\-\s]?\d{4})$/",
    "address-email" => "/(^$)|(^[\w\!\#\$\%\&\"\*\+\-\/\=\?\^\_\`\{\|\}\~]+([\w\!\#\$\%\&\"\*\+\-\/\=\?\^\_\`\{\|\}\~\.]?[\w\!\#\$\%\&\"\*\+\-\/\=\?\^\_\`\{\|\}\~\.]+)?\@{1}[\w\-]+(\.{1}\w+)+$)/",
    "card-name" => "/^[\w\-\s]+$/",
    "card-type" => "/^[\w]+[\w\s]*$/",
    "card-number" => "/^((\d{4}[ ]?){4})$/",
    "card-expires-month" => "/^\d+$/",
    "card-expires-year" => "/^\d+$/"
  );

  foreach ($_POST as $key => $value) {
    $regex = $REGEX_MAP[$key];
    if (!preg_match($regex, $value)) {
      endWithMessage(400, "Invalid parameter \"$key\" => \"$value\"");
    }
  }

  // endWithJSONObject(200, $_SESSION);
  $_SESSION["payment-confirm"] = "true";
  redirect("./result.php");
?>