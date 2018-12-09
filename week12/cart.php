<?php
  session_start();

  require("./modules/resourcemanage.php");
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
        <span class="u-pull-left">
          <label id="lbl-cart-size">
            <?=$totalItems ?>
          </label> item(s) in cart:
          <label id="lbl-cart-subtotal" class="u-price">
            $<?php echo(number_format($cartTotal, 2, ".", ",")); ?>
          </label>
        </span>
        <span class="u-pull-right">
          <a href="./browse.php"><button>Keep Shopping</button></a>
          <a href="./checkout.php"><button>Checkout</button></a>
        </span>
      </div>

      <div class="u-container">
        <span class="u-heading-2">Shopping Cart</span>
        <hr />
        <?php if ($totalItems <= 0): ?>
          <label id="lbl-cart-empty">Your cart is empty</label>
        <?php else: ?>
          <table id="table-products">
            <?php 
              $IMG_WIDTH = 100;
              $IMG_HEIGHT = 100;
              foreach ($storeItems as $item): if ($item->count > 0):
            ?>
              <tr>
                <?php
                  $imgFileName = $item->imageURL;
                  $localURL = "./assets/images/$imgFileName";
                ?>
                <td>
                  <a href="<?=$localURL ?>">
                    <img src="<?=$localURL ?>" width="<?=$IMG_WIDTH ?>" height="<?=$IMG_HEIGHT ?>" />
                  </a>
                </td>
                <td class="u-align-top">
                  <form method="post">
                    <label>
                      <strong><?=$item->name ?></strong>
                    </label>
                    <br />

                    <label for="sku">
                      SKU&mdash;<?=$item->sku ?>
                      <input type="text" name="sku" class="u-no-show" value="<?=$item->sku ?>" />
                    </label>

                    <label class="u-price">
                      $<?php echo(number_format($item->price, 2, ".", ",")); ?>
                    </label>
                    <br /><br />

                    <button type="submit" formaction="./remove-item.php">Remove From Cart</button>
                  </form>
                </td>
              </tr>
            <?php endif; endforeach; ?>
          </table>
        <?php endif; ?>
      </div>
    </div>
  </body>
</html>
