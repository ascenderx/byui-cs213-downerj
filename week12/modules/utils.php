<?php if (!isset($__UTILS_PHP__)) {
  $__UTILS_PHP__ = true;

  function endWithMessage($status, $message) {
    http_response_code(intval($status));
    header("Content-Type: text/html");
    echo($message);
    exit();
  }

  function endWithJSONObject($status, $object) {
    http_response_code(intval($status));
    header("Content-Type: application/json");
    echo(json_encode($object));
    exit();
  }

  function redirect($url) {
    http_response_code(308);
    header("Location: $url");
    exit();
  }
} ?>