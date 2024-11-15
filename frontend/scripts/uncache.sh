S3_BUCKET="bubblewars2024/frontend"


# html/index.html
echo "Setting no-cache metadata for html/index.html..."
aws s3 cp s3://$S3_BUCKET/html/index.html s3://$S3_BUCKET/html/index.html \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/html" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for html/index.html."
    exit 1
fi


# css/styles.css
echo "Setting no-cache metadata for css/styles.css..."
aws s3 cp s3://$S3_BUCKET/css/styles.css s3://$S3_BUCKET/css/styles.css \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/css" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for css/styles.css."
    exit 1
fi


# js/index.js
echo "Setting no-cache metadata for js/index.js..."
aws s3 cp s3://$S3_BUCKET/js/index.js s3://$S3_BUCKET/js/index.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/index.js."
    exit 1
fi


# js/canvas.js
echo "Setting no-cache metadata for js/canvas.js..."
aws s3 cp s3://$S3_BUCKET/js/canvas.js s3://$S3_BUCKET/js/canvas.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/canvas.js."
    exit 1
fi
