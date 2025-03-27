<div align="center">
<pre>
  <div align="center">
.   █████╗  ██████╗  █████╗  ██╗   ██╗ ███████╗████████╗
.  ██╔══██╗██╔═══██╗██╔═══██ ██╔══██╗  ██╔════╝   ██╔══╝
███████║██║   ██║██║      █████║    █████╗     ██║
██╔══ ═╝██║   ██║██║   ██╗██╔═ ██╗  ██╔══╝     ██║
██║     ╚██████╔╝╚██████╔╝██║   ██║ ███████╗   ██║
╚═╝      ╚═════╝  ╚═════╝ ╚═╝   ╚═╝ ╚══════╝   ╚═╝
  </div>
  <div align="center">

████╗     ████╗ ██████╗ ████╗     ██╗ ███████╗████████╗███████╗ ███████╗ ███████╗
██╔ ██║ ██║ ██║██╔═══██╗██╔ ██║   ██║ ██╔════╝   ██╔══╝██╔════╝ ██╔═══██╗██╔════╝
██║   ██║   ██║██║   ██║██║  ██║  ██║ ███████╗   ██║   █████╗   ██████╔╝ ███████╗
██║   ╚═╝   ██║██║   ██║██║   ██║ ██║ ╚════██║   ██║   ██╔══╝   ██╔═══██╗╚════██║
██║         ██║╚██████╔╝██║    █████║ ███████║   ██║   ███████╗ ██║   ██║███████║
╚═╝         ╚═╝ ╚═════╝ ╚═╝    ╚════╝ ╚══════╝   ╚═╝   ╚══════╝ ╚═╝   ╚═╝╚══════╝
</div>
---------------------------------------------------
<br/>
This is a Comprehensive Pokémon Pokedex; a full-stack application serving as an extensive Pokémon database.

</pre>
I grew up watching Pokémon and had this full deck of cards that I always played with as a kid. Working on this project was a blast and really brought back those fun memories. I hope it sparks some nostalgia for you as well!
</div>

## Setup

1. Clone this repo

2. Have a database setup and add pokemon related data to it. Refer ```server/src/models``` for database structure.

3. Use ```.env.example ``` file as a reference to create ```.env``` file and replace the values with your credentials/values.


## Installation

npm install both the client and server folders seperately.
```sh
npm install
```

## Run Application
To run client
```sh
npm run dev
```
To run server
```sh
node app.js
```

## API Documentation

Once you have your server running you can check the ```Swagger API documentation``` using thebelow URL

If you are running it locally change ```http``` to ```https```. Replace ```<base-url>``` with your server's base URL)

```sh
http://<base-url>/docs
```
