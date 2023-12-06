# Goal
1. find out if each game fit in 12 red cubes, 13 green cubes, and 14 blue cubes
2. sum their id

# Format of each line
at once: 
```
Game <number>: ((number color,)* number, color;)((number color,)* number, color;)
```


patterns:
```
one_color: number color
round: list of one_color with comma separator
game: title: list of rounds with semicolon separator
number: in digits
color: red|blue|green
```