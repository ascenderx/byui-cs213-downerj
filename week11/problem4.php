<?php
  $input4 = htmlspecialchars($_POST["input4"]);
  $dict = array(
    "one" => "uno",
    "two" => "dos",
    "three" => "tres",
    "four" => "cuatro",
    "five" => "cinco",
    "six" => "seis",
    "seven" => "siete",
    "eight" => "ocho",
    "nine" => "nueve",
    "ten" => "diez",
    "eleven" => "once",
    "twelve" => "doce",
    "thirteen" => "trece",
    "fourteen" => "catorce",
    "fifteen" => "quince",
    "sixteen" => "dieciséis",
    "seventeen" => "diecisiete",
    "eighteen" => "dieciocho",
    "nineteen" => "diecinueve",
    "twenty" => "veinte",
  );
  $response = $dict[$input4];
?>
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Week 11 : Problem 3</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <p>
      <?php if ($response === null): ?>
        The English cardinal "<?= $input4 ?>" is not between "one" and "twenty"
      <?php else: ?>
        The word "<?= $input4 ?>" in Spanish is "<?= $response ?>"
      <?php endif; ?>
    </p>
  </body>
</html>