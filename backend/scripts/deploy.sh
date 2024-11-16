#!/bin/bash


# Define variables.
LAMBDA_FUNCTION_NAME="bubblewars-backend"
ZIP_FILE="lambda.zip"


echo "Starting deployment process..."


# Update node modules.
echo "Updating node modules..."
npm install


echo "Pruning devDependencies..."
npm prune --production


# Zip the Lambda function code.
echo "Zipping Lambda function code..."
zip -r ./$ZIP_FILE .


# Update the Lambda function code.
echo "Updating Lambda function..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://$ZIP_FILE


# Delete the zip file.
echo "Cleaning up..."
rm $ZIP_FILE


# Exit
echo "Deployment complete!"
