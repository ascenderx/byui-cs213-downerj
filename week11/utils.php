<?php
  /**
    * FAIL
    * Sends an error response to the client as a separate page,
    * halting PHP evaluation in the process.
    * @param code    The HTTP status/error code
    * @param message The error message to display
    */
  function fail($code, $message) {
    http_response_code($code);
    header("Content-Type: text/html");
    echo($message);
    exit();
  }

  /**
   * COMPARE STRINGS, CASE INSENSITIVE
   * Compares two strings after transforming them to the same case.
   * @param lhs  The first string
   * @param rhs  The second string
   * @return int -1 if lhs < rhs; 0 if lhs === rhs; +1 if lhs > rhs
   */
  function compareCaseInsensitive($lhs, $rhs) {
    $astr = strtolower(strval($lhs));
    $bstr = strtolower(strval($rhs));

    return strcmp($astr, $bstr);
  }
?>