< insert readme here >


## Docker Setup

### Ubuntu

`sudo aa-remove-unknown` can be used to clear any lingering jobs which might be holding things up, then `sudo docker stop $(sudo docker ps -aq) && sudo docker rm $(sudo docker ps -aq)` will stop and remove any containers which haven't been properly shut down. 


**** Need to include lenghty explanation of docker containers and why they're being used to simulate the network here.