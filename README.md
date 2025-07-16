# Heading

- join a room

```
{
    "type" : "join",
    "payload" : {
        "roomId" : "123"
    }
}
```

- send a message

```
{
    "type" : "broadcast",
    "payload" : {
        "roomId" : "123",
        "message" : "hey guys, wassup?"
    }
}
```
