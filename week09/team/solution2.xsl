<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" indent="yes" />
<xsl:strip-space elements="track title location" />

<xsl:template match="/">
  <playlist>
    <trackList>
      <xsl:for-each select="playlist/track">
        <xsl:copy-of select="." />
      </xsl:for-each>
    </trackList>
  </playlist>
</xsl:template>

<xsl:template match="track">
  <track><xsl:value-of select="." /></track>
</xsl:template>

<xsl:template match="title">
  <title><xsl:value-of select="." /></title>
</xsl:template>

<xsl:template match="location">
  <location><xsl:value-of select="." /></location>
</xsl:template>

</xsl:stylesheet>