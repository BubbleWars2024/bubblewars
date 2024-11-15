echo "DEPLOYING!!!"
cd backend
sh scripts/deploy.sh
cd ../frontend
sh scripts/deploy.sh
echo "DEPLOYED!!!"