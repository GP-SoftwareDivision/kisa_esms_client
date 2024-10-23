docker stop kisa-dashboard-container

docker rm kisa-dashboard-container

docker rmi $(docker images kisa-dashboard -q)

docker build -t kisa-dashboard .

docker run -d -p 80:80 --name kisa-dashboard-container kisa-dashboard

