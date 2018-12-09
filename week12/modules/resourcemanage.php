<?php if (!isset($__RESOURCE_MANAGE_PHP__)) {
  $__RESOURCE_MANAGE_PHP__ = true;

  require('modules/utils.php');

  if (!isset($_SESSION["store-items"])) {
    $FILE_NAME = "./modules/items.json";
    $storeFile = @fopen($FILE_NAME, "r");
    if (!$storeFile) {
      endWithMessage(500, "Error opening store file");
    }
    $itemsJSON = fread($storeFile, filesize($FILE_NAME));
    if (!$itemsJSON) {
      fclose($storeFile);
      endWithMessage(500, "Error reading from store file");
    }
    fclose($storeFile);

    $storeItems = json_decode($itemsJSON, false);
    foreach ($storeItems as $sku => $item) {
      $item->count = 0;
    }
    $_SESSION["store-items"] = $storeItems;
  } else {
    $storeItems = $_SESSION["store-items"];
  }

  $totalItems = 0;
  $cartTotal = 0.00;
  foreach ($storeItems as $sku => $item) {
    $totalItems += $item->count;
    $cartTotal += $item->count * $item->price;
  }
} ?>