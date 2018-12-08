<!DOCTYPE html>
<html lang="en-US">
    <head>
        <!-- details -->
        <title>Downertech | Checkout</title>
        <meta name="author" content="James Downer" />
        <meta name="description" content="" />

        <!-- viewport -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Chrome-Android tab color -->
        <meta name="theme-color" content="#004" />

        <!-- encoding -->
        <meta charset="UTF-8" />

        <!-- icon: iPhone, iPod Touch, Android -->
        <link rel="apple-touch-icon-precomposed" href="./assets/images/red-arrow-down.svg" />
        <!-- icon: basic -->
        <link rel="shortcut icon" href="./assets/images/red-arrow-down.svg" />

        <!-- Open Graph Data | Facebook -->
        <meta property="og:image" content="" />
        <meta property="og:description" content="" />
        <meta property="og:title" content="Downertech" />
        <!-- Twitter -->
        <meta name="twitter:title" content="Downertech" />

        <link rel="stylesheet" href="top.css" />
    </head>
    <body onload="onLoad();">
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
                    <a href="./cart.html"><button>View Cart</button></a>
                </span>
            </div>
            <div class="u-container">
                <span class="u-heading-2">Checkout</span>
                <hr />
                <label id="lbl-cart-empty">Your cart is empty<br /></label>

                <span class="u-required"></span> Required field
                <br />
                <br />
                <form id="frm-main" onreset="onReset();" onchange="onChange();">
                <span class="u-heading-3">Billing Information</span>
                <table class="table-user-info">
                    <tr>
                        <td><label for="first-name" class="u-required">First Name</label></td>
                        <td><input type="text" name="first-name" id="txt-first-name" /></td>
                    </tr>
                    <tr>
                        <td><label for="last-name" class="u-required">Last Name</label></td>
                        <td><input type="text" name="last-name" id="txt-last-name" /></td>
                    </tr>
                    <tr>
                        <td><label for="address-street" class="u-required">Address</label></td>
                        <td><input type="text" name="address-street" id="txt-address-street" title="May contain only letters, numbers, spaces, hyphens (–), slashes (/) and dots (.)"/></td>
                    </tr>
                    <tr>
                        <td><label for="address-2">Address 2</label></td>
                        <td><input type="text" name="address-2" id="txt-address-2" /></td>
                    </tr>
                    <tr>
                        <td><label for="address-city" class="u-required">City</label></td>
                        <td><input type="text" name="address-city" id="txt-address-city" title="May contain only letters, spaces, hypens and dots" /></td>
                    </tr>
                    <tr>
                        <td><label for="address-state" class="u-required">State</label></td>
                        <td>
                            <select name="address-state" id="sel-address-state"></select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="address-zip" class="u-required">Zip</label></td>
                        <td><input type="text" name="address-zip" id="txt-address-zip" title="XXXXX or XXXXX-XXXX" /></td>
                    </tr>
                    <tr>
                        <td><label for="phone-number" class="u-required">Phone</label></td>
                        <td><input type="text" name="phone-number" id="txt-phone-number" title="+1 XXX-XXX-XXXX, (XXX) XXX-XXXX, etc."/></td>
                    </tr>
                    <tr>
                        <td><label for="address-email">Email</label></td>
                        <td><input type="text" name="address-email" id="txt-address-email" /></td>
                    </tr>
                </table>
                <br />
                <span class="u-heading-3">Payment Information</span>
                <table class="table-user-info">
                    <tr>
                        <td><label for="card-name" class="u-required">Name on Card</label></td>
                        <td><input type="text" name="card-name" id="txt-card-name" /></td>
                    </tr>
                    <tr>
                        <td><label for="card-type" class="u-required">Card Type</label></td>
                        <td><select name="card-type" id="sel-card-type"></select></td>
                    </tr>
                    <tr>
                        <td><label for="card-number" class="u-required">Card Number</label></td>
                        <td><input type="text" name="card-number" id="txt-card-number" /></td>
                    </tr>
                    <tr>
                        <td><label for="card-expires" class="u-required">Expiration Date</label></td>
                        <td>
                            <select name="card-expires-month" id="sel-card-expires-month" class="u-input-small"></select>
                            /
                            <select name="card-expires-year" id="sel-card-expires-year" class="u-input-small"></select>
                        </td>
                    </tr>
                </table>

                <br />
                <button type="button" id="bt-submit" onclick="onSubmitClick();">Submit Payment</button>
                <button type="button" id="bt-reset" onclick="onResetClick();">Reset</button>
                </form>
            </div>
        </div>

        <script type="application/javascript" src="./modules/utils.js"></script>
        <script type="application/javascript" src="./modules/ajax.js"></script>
        <script type="application/javascript" src="./modules/product.js"></script>
        <script type="application/javascript" src="./modules/shoppingcart.js"></script>
        <script type="application/javascript" src="./modules/webstorage.js"></script>
        <script type="application/javascript" src="./modules/resourcemanage.js"></script>
        <script type="application/javascript" src="./checkout.js"></script>
    </body>
</html>
