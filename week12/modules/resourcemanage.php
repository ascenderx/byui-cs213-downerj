<?php
  if (!isset($_SESSION["store-items"])) {
    $fileName = "./modules/items.json";
    $storeFile = fopen($fileName, "r") or die("Unable to read store.json");
    $itemsJSON = fread($storeFile, filesize($fileName));
    fclose($storeFile);
    $storeItems = json_decode($itemsJSON);
    
    $_SESSION["store-items"] = $storeItems;
  } else {
    $storeItems = $_SESSION["store-items"];
  }

  $totalItems = 0;
  foreach ($storeItems as $item) {
    $sku = $item->sku;
    $item->count = $_SESSION["$sku-count"] || 0;
    $totalItems += $item->count;
  }
?>