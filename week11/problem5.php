<?php
  require("utils.php");

  // get params
  $x = htmlspecialchars($_POST["x"]);
  $n = htmlspecialchars($_POST["n"]);

  // assert that the params are numeric and parse them as integers
  if (!is_numeric($x)) {
    fail(400, "Invalid: non-numeric parameter x = \"$x\"");
  } else if (!is_numeric($n)) {
    fail(400, "Invalid: non-numeric parameter n = \"$n\"");
  } else {
    $x = intval($x);
    $n = intval($n);
  }

  // assert that the params are positive
  if ($x < 1) {
    fail(400, "Invalid: non-positive parameter x = \"$x\"");
  } else if ($n < 1) {
    fail(400, "Invalid: non-positive parameter n = \"$n\"");
  }
?>
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Week 11 : Problem 3</title>
    <meta charset="UTF-8" />
    <style>
      .pull-right {
        text-align: right;
      }

      .border-collapse {
        border-collapse: collapse;
      }

      .border-bottom th {
        border-bottom: 3px solid #005;
      }

      .pad-horiz {
        padding-left: 5px;
        padding-right: 5px;
      }
    </style>
  </head>
  <body>
    <p>
      <table class="border-collapse">
        <thead class="border-bottom">
          <tr>
            <th>N</th>
            <th>X<sup>N</sup></th>
          </tr>
        </thead>
        <tbody>
          <?php for ($i = 1; $i <= $n; $i++): ?>
            <tr>
              <td class="pull-right pad-horiz"><?= $i ?></td>
              <td class="pull-right pad-horiz"><?= $x ** $i ?></td>
            </tr>
          <?php endfor; ?>
        </tbody>
      </table>
    </p>
  </body>
</html>