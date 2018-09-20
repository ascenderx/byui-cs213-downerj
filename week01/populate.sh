read -p "Are you sure you want to rewrite the contents off week*/index.html? " choice
if [[ $choice =~ ^[Yy]$ ]]
then

count=1
for d in ../week*/
do
weekNum=$(printf %02d $count)

echo \
"<!DOCTYPE html>\n\
<html lang=\"en-US\">\n\
    <head>\n\
        <title>Week $weekNum</title>\n\
        <meta charset=\"UTF-8\" />\n\
    </head>\n\
    <body>\n\
        This will be week #$weekNum\n\
    </body>\n\
</html>\n" > $d/index.html

count=$((count + 1))
done

fi