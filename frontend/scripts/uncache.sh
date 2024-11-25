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


# js/ens.js
echo "Setting no-cache metadata for js/ens.js..."
aws s3 cp s3://$S3_BUCKET/js/ens.js s3://$S3_BUCKET/js/ens.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/ens.js."
    exit 1
fi


# js/header.js
echo "Setting no-cache metadata for js/header.js..."
aws s3 cp s3://$S3_BUCKET/js/header.js s3://$S3_BUCKET/js/header.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/header.js."
    exit 1
fi


# js/refer.js
echo "Setting no-cache metadata for js/refer.js..."
aws s3 cp s3://$S3_BUCKET/js/refer.js s3://$S3_BUCKET/js/refer.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/refer.js."
    exit 1
fi


# js/state.js
echo "Setting no-cache metadata for js/state.js..."
aws s3 cp s3://$S3_BUCKET/js/state.js s3://$S3_BUCKET/js/state.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/state.js."
    exit 1
fi


# js/utils.js
echo "Setting no-cache metadata for js/utils.js..."
aws s3 cp s3://$S3_BUCKET/js/utils.js s3://$S3_BUCKET/js/utils.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/utils.js."
    exit 1
fi


# js/multiplayer.js
echo "Setting no-cache metadata for js/multiplayer.js..."
aws s3 cp s3://$S3_BUCKET/js/multiplayer.js s3://$S3_BUCKET/js/multiplayer.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/multiplayer.js."
    exit 1
fi


# js/ai.js
echo "Setting no-cache metadata for js/ai.js..."
aws s3 cp s3://$S3_BUCKET/js/ai.js s3://$S3_BUCKET/js/ai.js \
    --metadata-directive REPLACE \
    --cache-control "no-store, must-revalidate" \
    --expires "Thu, 01 Jan 1970 00:00:00 GMT" \
    --content-type "text/javascript" \
    --metadata Pragma="no-cache"
if [ $? -ne 0 ]; then
    echo "Error: Failed to set no-cache metadata for js/ai.js."
    exit 1
fi
