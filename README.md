# laforge

## Your k8s build Chief Engineer


![Kiku](./assets/logo.png)

```
USAGE
  $ laforge docker
COMMANDS
  docker:build  Describe the command here
  docker:push   Describe the command here
```

```
USAGE
  $ laforge docker:build

OPTIONS
  -c, --context=context  Docker context default .
  -n, --name=name        Name of Container image
  -s, --short            Provide short version of git commit hash
  -t, --tag=tag          Container tag
```

```
USAGE
  $ laforge docker:push

OPTIONS
  -n, --name=name  Name of Container image
  -s, --short      Provide short version of git commit hash
  -t, --tag=tag    Container tag
```