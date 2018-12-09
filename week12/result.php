<?php
  session_start();

  require("./modules/utils.php");
  require("./modules/resourcemanage.php");

  $confirm = $_SESSION["payment-confirm"];
  if (!isset($confirm) || $confirm !== "true") {
    endWithMessage(401, "Unauthorized");
  }
?>

<!DOCTYPE html>
<html lang="en-US">
  <head>
    <!-- details -->
    <title>Downertech | Cart</title>
    <?php require("./modules/metadata.php"); ?>
  </head>
  <body>
    <div class="u-meta-container">
      <?php require("./modules/top-header.php"); ?>

      <div class="u-container">
        <span class="u-heading-2">Confirmation</span>
        <hr />

        Thank you for your purchase!
        <br />
        Your confirmation number is: <strong><?php echo(rand(50000, 10000000)); ?></strong>
      </div>
    </div>
  </body>
</html>

<?php
  session_destroy();
?>