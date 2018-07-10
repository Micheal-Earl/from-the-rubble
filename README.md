Current goal for MVP:

Players start with 100 wood. 
Players gain ((5 * amountOfControlledCities) + amountOfCityUpgrades) wood every 10 seconds. 
Players may build a city for 100 wood, or upgrade a city for 100 wood.
Players build cities by clicking a tile and selecting "build new city"
Players may only have a total of 3 cities
Cities can only be built on tiles that have not had a city built on them yet

Players can construct soldiers for 10 wood. 
Each city can hold 10 soldiers.
An upgraded city can hold 5 additional soldiers per upgrade.
Players can send their soldiers out to other cities to attack and steal wood.
Soldiers take amountOfTilesToTraverse * 100seconds to reach their destination.
Once there whoever has more soldiers wins, or a coin is flipped if soldiers are equal.
Soldiers return home at the same rate they left for their destination.

Currently players should only exist for the duration of their socket connection, on disconnect they should have all of their data erased and cities cleared.