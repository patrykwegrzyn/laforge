# laforge

## Your k8s build Chief Engineer


![Kiku](./assets/logo.png)

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