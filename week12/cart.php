<!DOCTYPE html>
<html lang="en-US">
    <head>
        <!-- details -->
        <title>Downertech | Cart</title>
        <?php require('./modules/metadata.php'); ?>
    </head>
    <body>
        <div class="u-meta-container">
            <a href="../index.html">&larr; Back to assignments</a>
            <br /><br />
            
            <div class="u-container">
                <div class="u-heading-1">DOWNERTECH</div>
                <div class="u-heading-3">ART GALLERY</div>
            </div>
            <div class="u-container">
                <span class="u-pull-left">
                    <label id="lbl-cart-size">0</label> item<label id="lbl-cart-size-s">s</label> in cart:
                    <label id="lbl-cart-subtotal" style="color: #ff0;"></label>
                </span>
                <span class="u-pull-right">
                    <a href="./browse.html"><button>Keep Shopping</button></a>
                    <a href="./checkout.html"><button>Checkout</button></a>
                </span>
            </div>
            <div class="u-container">
                <span class="u-heading-2">Shopping Cart</span>
                <hr />
                <label id="lbl-cart-empty">Your cart is empty</label>
                <table id="table-products"></table>
            </div>
        </div>

        <script type="application/javascript" src="./modules/utils.js"></script>
        <script type="application/javascript" src="./modules/ajax.js"></script>
        <script type="application/javascript" src="./modules/product.js"></script>
        <script type="application/javascript" src="./modules/shoppingcart.js"></script>
        <script type="application/javascript" src="./modules/webstorage.js"></script>
        <script type="application/javascript" src="./modules/resourcemanage.js"></script>
        <script type="application/javascript" src="./cart.js"></script>
    </body>
</html>
