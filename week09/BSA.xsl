<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" />
<xsl:strip-space elements="*" />

<xsl:template match="/">
  <html lang="en-US">
    <head>
      <title>Prove 09 : BSA</title>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="BSA.css" />
    </head>
    <body>
      <xsl:for-each select="bsa/council">
        <div class="u-accordion-1">
          <h2><xsl:value-of select="@name" /></h2>
          <div class="u-float-right">+</div>
          <div class="u-accordion-content">
            <xsl:apply-templates select="troop" />
          </div>
        </div>
      </xsl:for-each>

      <script type="application/javascript" src="BSA.js"></script>
    </body>
  </html>
</xsl:template>

<xsl:template match="bsa/council/troop">
  <table class="u-table-1">
    <thead>
      <th>Last Name</th>
      <th>First Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Phone</th>
    </thead>
    <tbody>
      <xsl:apply-templates select="scout" />
    </tbody>
  </table>
</xsl:template>

<!-- <xsl:template match="bsa/council/troop">
  <table class="u-table-1">
    <thead>
      <th>Last Name</th>
      <th>First Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Phone</th>
    </thead>
    <tbody>
      <xsl:apply-templates select="scout" />
    </tbody>
  </table>
</xsl:template>

<xsl:template match="bsa/council/troop/scout">
  <tr>
    <td>
      <xsl:value-of select="lastname" />
    </td>
    <td>
      <xsl:value-of select="firstname" />
    </td>
    <xsl:apply-templates select="address" />
    <td>
      <xsl:value-of select="phone" />
    </td>
  </tr>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/address">
  <td>
    <xsl:value-of select="street" />
  </td>
  <td>
    <xsl:value-of select="city" />
  </td>
  <td>
    <xsl:value-of select="state" />
  </td>
</xsl:template> -->

</xsl:stylesheet>