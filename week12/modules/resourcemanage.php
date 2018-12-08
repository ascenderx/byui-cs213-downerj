<?php
  require('modules/utils.php');

  if (!isset($_SESSION["store-items"])) {
    $fileName = "./modules/items.json";

    $storeFile = @fopen($fileName, "r");
    
    if (!$storeFile) {
      endWithMessage(500, "Error reading from store file");
    }
    
    $itemsJSON = fread($storeFile, filesize($fileName));
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
  foreach ($storeItems as $sku => $item) {
    $totalItems += $item->count;
  }
?>