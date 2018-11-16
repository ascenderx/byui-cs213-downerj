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
  <xsl:apply-templates select="scout" />
</xsl:template>

<xsl:template match="bsa/council/troop/scout">
  <xsl:value-of select="lastname" />,&#160;<xsl:value-of select="firstname" />
  <ul>
    <li>Address:<xsl:apply-templates select="address" /></li>
    <li>Phone:&#160;<xsl:value-of select="phone" /></li>
    <li>Ranks:
      <table>
        <thead>
          <th>Title</th>
          <th>Date Earned</th>
        </thead>
        <tbody>
          <xsl:apply-templates select="rank" />
        </tbody>
      </table>
    </li>
    <li>Merit Badges:
      <table>
        <thead>
          <th>Title</th>
          <th>Date Earned</th>
        </thead>
        <tbody>
          <xsl:apply-templates select="meritbadge" />
        </tbody>
      </table>
    </li>
  </ul>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/address">
  <ul>
    <li>Street:&#160;<xsl:value-of select="street" /></li>
    <li>City:&#160;<xsl:value-of select="city" /></li>
    <li>State:&#160;<xsl:value-of select="state" /></li>
  </ul>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/rank">
  <tr>
    <td><xsl:value-of select="." /></td>
    <td><xsl:value-of select="@date-earned" /></td>
  </tr>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/meritbadge">
  <tr>
    <td><xsl:value-of select="." /></td>
    <td><xsl:value-of select="@date-earned" /></td>
  </tr>
</xsl:template>


</xsl:stylesheet>