<?php
  require("utils.php");

  // get params
  $input6 = htmlspecialchars($_POST["input6"]);

  $words = preg_split("/[\s,]+/", $input6);

  if (!usort($words, compareCaseInsensitive)) {
    fail(500, "Unexpected error sorting list");
  }
?>
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Week 11 : Problem 3</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <p>
      <table class="border-collapse">
        <tbody>
          <?php foreach($words as $word): ?>
            <tr>
              <td><?= $word ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </p>
  </body>
</html>