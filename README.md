# laforge

## Your k8s & Docker Chief Engineer


![Kiku](./assets/logo.png)


#### example `setvice.yaml`

```
registry: registry.space
name: laforge
protocol: TCP
targetPort: 3000
port: 80
memory: 0.15G
cpu: 0.1
max_memory: 0.2G
max_cpu: 0.2
```


## Docker stuff
```
USAGE
  $ laforge docker
COMMANDS
  docker:build  Build image
  docker:push   Push image
```

```
USAGE
  $ laforge docker:build

OPTIONS
  -c, --context=context  Docker context default .
  -n, --name=name        Overwrite (service.yaml) name of container 
  -s, --short            Provide short version of git commit hash
  -t, --tag=tag          Container tag instead of git hash
```

```
USAGE
  $ laforge docker:push

OPTIONS
  -n, --name=name  Overwrite (service.yaml) name of container
  -s, --short      Provide short version of git commit hash
  -t, --tag=tag    Container tag instead of git hash
```