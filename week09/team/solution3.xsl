<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" />
<xsl:strip-space elements="file" />

<xsl:template match="/">
  <html lang="en-US">
    <head>
      <title>Teach 09 : Problem 3</title>
      <meta charset="UTF-8" />
      <style>
        table {
          border-collapse: collapse;
        }
        th {
          border-top: 3px solid #000;
          border-bottom: 3px solid #000;
          background-color: #f00;
          color: #fff;
          padding: 5px;
        }
        td {
          border: 1px solid #000;
          padding: 5px;
        }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <th>Name</th>
          <th>Size</th>
          <th>Type</th>
        </thead>
        <tbody>
          <xsl:for-each select="directory/file">
            <tr>
              <td><xsl:value-of select="@name" /></td>
              <td><xsl:value-of select="@size" /></td>
              <td><xsl:value-of select="@type" /></td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>