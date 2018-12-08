<?php
  session_start();
  
  require('./modules/utils.php');

  $reqMethod = $_SERVER["REQUEST_METHOD"];
  if ($reqMethod !== "POST") {
    endWithMessage(400, "Invalid request method \"$reqMethod\"");
  }

  $sku = $_POST["sku"];
  if (!isset($sku)) {
    endWithMessage(400, "Missing SKU parameter");
  }

  $sku = htmlspecialchars($sku);
  $storeItems = $_SESSION["store-items"];
  $item = $storeItems->{$sku};
  if (!isset($item)) {
    endWithMessage(400, "Invalid SKU \"$sku\"");
  }

  $item->count++;

  $_SESSION["store-items"] = $storeItems;

  // endWithJSONObject(200, $_SESSION);
  redirect("./browse.php");
?>