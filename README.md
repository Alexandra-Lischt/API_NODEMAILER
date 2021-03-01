# How to run the project

```yarn dev```

# How to create migration
# Notice that we are using cli instead of running the command 'typeorm' in the global way, verify the file ormconfig.json

```yarn typeorm migration:create -n migrateName```

# How to run a migration

```yarn typeorm migration:run```

# How to revert a migration

```yarn typeorm migration:revert```

