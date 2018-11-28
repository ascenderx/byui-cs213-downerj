<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Week 11 : Problem 2</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <p>
      The current date & time in Rexburg, ID is:<br />
      <strong>
      <?php
        $now = new DateTime("now", new DateTimeZone("MDT"));
        $now->setTimestamp(time());
        echo($now->format("l, F jS h:i:sa"));
      ?>
      </strong>
      <br /><br />
      The equivalent UNIX timestamp is <strong><?php echo time(); ?></strong>.
    </p>
  </body>
</html>