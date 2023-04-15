#!/bin/bash
mongoimport --host localhost --db Reactdb --collection bitables --file /docker-entrypoint-initdb.d/bitables.json --jsonArray
mongoimport --host localhost --db Reactdb --collection onepoints --file /docker-entrypoint-initdb.d/onepoints.json --jsonArray
mongoimport --host localhost --db Reactdb --collection tablemangos --file /docker-entrypoint-initdb.d/tablemangos.json --jsonArray