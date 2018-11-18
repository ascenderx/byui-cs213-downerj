<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" />
<xsl:strip-space elements="*" />

<xsl:template match="/">
  <html lang="en-US">
    <head>
      <title>Prove 09 : BSA</title>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="BSA.css" />
    </head>
    <body>
      <ul>
        <xsl:apply-templates select="bsa/council" />
      </ul>

      <script type="application/javascript" src="BSA.js"></script>
    </body>
  </html>
</xsl:template>

<xsl:template match="bsa/council">
  <li>
    <div class="u-expandable-clickable">Council: <xsl:value-of select="@name" /></div>
    <ul class="light-blue u-expandable">
      <xsl:apply-templates select="troop" />
    </ul>
  </li>
</xsl:template>

<xsl:template match="bsa/council/troop">
  <li>
    <div class="u-expandable-clickable">
      Troop #<xsl:value-of select="@number" />: <xsl:value-of select="@unit" />
    </div>
    <ul class="white u-expandable">
     <xsl:apply-templates select="scout" />
    </ul>
  </li>
</xsl:template>

<xsl:template match="bsa/council/troop/scout">
  <li>
    <div class="u-expandable-clickable">
      <xsl:value-of select="lastname" />,&#160;<xsl:value-of select="firstname" />
    </div>
    <ul class="light-blue u-expandable">
      <li>
        <div class="u-expandable-clickable">Address:</div>
        <div class="u-expandable"><xsl:apply-templates select="address" /></div>
      </li>
      <li>Phone:&#160;<xsl:value-of select="phone" /></li>
      <li>
        <div class="u-expandable-clickable">Ranks:</div>
        <table class="white u-expandable">
          <thead>
            <th>Title</th>
            <th>Date Earned</th>
          </thead>
          <tbody>
            <xsl:apply-templates select="rank" />
          </tbody>
        </table>
      </li>
      <li>
        <div class="u-expandable-clickable">Merit Badges:</div>
        <table class="white u-expandable">
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
  </li>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/address">
  <ul class="white">
    <li>Street:&#160;<xsl:value-of select="street" /></li>
    <li>City:&#160;<xsl:value-of select="city" /></li>
    <li>State:&#160;<xsl:value-of select="state" /></li>
  </ul>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/rank">
  <tr>
    <td><xsl:value-of select="." /></td>
    <td class="grow"><xsl:value-of select="@date-earned" /></td>
  </tr>
</xsl:template>

<xsl:template match="bsa/council/troop/scout/meritbadge">
  <tr>
    <td><xsl:value-of select="." /></td>
    <td class="grow"><xsl:value-of select="@date-earned" /></td>
  </tr>
</xsl:template>


</xsl:stylesheet>