<?php
  session_start();

  require('./modules/resourcemanage.php');
?>

<!DOCTYPE html>
<html lang="en-US">
  <head>
    <!-- details -->
    <title>Downertech | Art Gallery</title>
    <?php require('./modules/metadata.php'); ?>
  </head>
  <body>
    <div class="u-meta-container">
      <?php require('./modules/top-header.php'); ?>

      <div class="u-container">
        <span class="u-pull-left">
          <label id="lbl-cart-size">
            <?=$totalItems ?>
          </label> item(s) in cart
        </span>
        <span class="u-pull-right">
          <a href="./cart.php"><button>View Cart</button></a>
          <a href="./checkout.php"><button>Checkout</button></a>
        </span>
      </div>

      <div class="u-container">
        <span class="u-heading-2">BROWSE PRODUCTS</span>
          <hr />
          <table id="table-products">
            <?php 
              $IMG_WIDTH = 150;
              $IMG_HEIGHT = 150;
              foreach ($storeItems as $item):
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

                  <label>
                    <?=$item->description ?>
                  </label>
                  <br /><br />

                  <label for="sku">
                    SKU&mdash;<?=$item->sku ?>
                    <input type="text" name="sku" class="u-no-show" value="<?=$item->sku ?>" />
                  </label>
                  <br />

                  <label class="u-price">
                    $<?php
                      echo(number_format($item->price, 2, ".", ","));
                    ?>
                  </label>
                  <br /><br />
                  
                  <?php if ($item->count <= 0): ?>
                    <button type="submit" formaction="./add-item.php">Add To Cart</button>
                  <?php else: ?>
                    <button type="submit" formaction="./remove-item.php">Remove From Cart</button>
                  <?php endif; ?>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </table>
      </div>
    </div>

    <!-- <script type="application/javascript" src="./modules/utils.js"></script> -->
    <!-- <script type="application/javascript" src="./modules/ajax.js"></script> -->
    <!-- <script type="application/javascript" src="./modules/product.js"></script> -->
    <!-- <script type="application/javascript" src="./modules/shoppingcart.js"></script> -->
    <!-- <script type="application/javascript" src="./modules/webstorage.js"></script> -->
    <!-- <script type="application/javascript" src="./modules/resourcemanage.js"></script> -->
    <!-- <script type="application/javascript" src="./browse.js"></script> -->
  </body>
</html>
