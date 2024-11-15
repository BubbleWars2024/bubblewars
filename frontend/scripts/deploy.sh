#!/bin/bash


# Define variables.
S3_BUCKET="bubblewars2024/frontend"


echo "Starting deployment process..."


# Update node modules.
echo "Updating node modules..."
npm install


# Sync the build directory with your S3 bucket.
echo "Uploading files to S3..."
aws s3 sync . s3://$S3_BUCKET --exclude "*.ts" --exclude ".DS_Store" --exclude "*.d.ts" --exclude "scripts/*"
if [ $? -ne 0 ]; then
    echo "Error: Failed to upload files to S3."
    exit 1
fi


# Set no-cache headers.
echo "Uncaching uploads..."
sh ./scripts/uncache.sh


# Exit
echo "Deployment complete with no-cache metadata set."
