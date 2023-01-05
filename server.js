const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
let firstCard = null
let players = []
let result = null
let turnCounter = 0;

io.on('connection', function (socket) {
    console.log('Le joueur est connecté: ' + socket.id);

    if(players.length == 0){
        socket.emit('isPlayerA')
    }
    players.push(socket.id)
    console.log(players.length)


    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    
socket.on('cardPlayed', function (gameObject) {
    console.log(gameObject, socket.id);
    if (firstCard == null) {
      firstCard = { playerId: socket.id, card: gameObject };
      io.emit('cardPlayed', firstCard);
      return;
    }
    let secondCard = { playerId: socket.id, card: gameObject };
    console.log(firstCard, secondCard);
    io.emit('cardPlayed', secondCard);
  
    turnCounter++;
  
    if (turnCounter === 3) {
      turnCounter = 0;
  
      if (firstCard.card.textureKey == 'king' && secondCard.card.textureKey == "slave") {
        console.log(secondCard.playerId, 'win slave');
        result = "win slave";
        io.emit('cardPlayed', result);
        io.emit('roundEnd');
        return;
      }
      if (firstCard.card.textureKey == 'citizen' && secondCard.card.textureKey == "slave") {
        console.log(firstCard.playerId, 'win citizen');
        result = "win citizen";
        io.emit('cardPlayed', result);
        io.emit('roundEnd');
        return;
      }
      if (firstCard.card.textureKey == 'king' && secondCard.card.textureKey == "citizen") {
        console.log(firstCard.playerId, 'win king');
        result = "win king";
        io.emit('cardPlayed', result);
        io.emit('roundEnd');
        return;
      }
      if (firstCard.card.textureKey == 'citizen' && secondCard.card.textureKey == "citizen") {
        result = "égalité";
        io.emit('cardPlayed', result);
        io.emit('roundEnd');
        return;
      }
    }
  });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });

    socket.on('roundEnd', function () {
        firstCard = null;
        secondCard = null;
        turnCounter = 0;
      });
});

http.listen(3000, function () {
    console.log('Server started!');
});