var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
let thumbDown = document.getElementsByClassName("fa-thumbs-down")
let complete = document.getElementsByClassName("fa-pencil-alt")
let bet = document.querySelector('.bet').value
let balance = 1000
let colorChoice = ""
let winCount = 0
let lossCount = 0
let moneyExchanged = 0

document.querySelector('#magicReset').addEventListener('click', function(){
  fetch('cleanSlate',{
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      // 'winCount': 0,
      // 'lossCount': 0,
      // 'moneyExchanged': 0,
      // 'casinoBalance': 0,
      // 'yohannName': 'casino'
    })
  })
  .then((response) => {
    // if (response.ok) return response.json()
  })
})


document.querySelector('#red').addEventListener('click', function(){
  colorChoice = 'red'
  let bet = document.querySelector('.bet').value
  calculateBalance(bet)
  console.log('test',bet)
  console.log(colorChoice)
  fetch('play', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'yohannName': 'casino',
        'winCount': winCount,
        'lossCount': 1
    })
  })
  .then((response) => {
  if (response.ok) return response.json()
  })
})

function multiplyBy10(bet){
  return bet * 10
}

function balanceMinusBet(bet){
  return balance - bet
}

function calculateBalance(bet){
  const outcome = winCheck()
  if (outcome === "loss"){
    balance = balanceMinusBet(bet)
  }else if (outcome === "win"){
    balance = balanceMinusBet(bet) + multiplyBy10(bet)
  }
  document.getElementById("amount").innerHTML = `${outcome} $${balance}.00`//template string to add $ sign and .00 to balance
}

function winCheck (){
  const reel1 = reelspin()  //In order to return the results of a function, you need to call the function and make the return a variable in the function your working in.
  document.getElementById("reel-1").innerHTML = reel1;
  if(reel1 === colorChoice){
    winCount +=1
    console.log(winCount)
    return "win"

  }else{
    lossCount +=1
    console.log(lossCount)
    return "loss"
    }
}

function reelspin(){
  let result = Math.random()
  if (result < .1){
    return "green"
  } else if (result < .55){
    return "red"
  } else if(result < 1){
    return "black"
  }
}


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

// <<<<<<< HEAD
// =======
Array.from(complete).forEach(function(element) {
      element.addEventListener('click', function(){
        const  customerName= this.parentNode.parentNode.childNodes[3].innerText
        console.log(customerName)
        const order = this.parentNode.parentNode.childNodes[7].innerText
        console.log(order);
        fetch('cafe', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'customerName':customerName,
            'order':order,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

// >>>>>>> ff52c0ca368b663fa88c97df5a0c7eeb7f68299e
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('/thumbDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const baristaName = this.parentNode.parentNode.childNodes[3].innerText
        console.log(baristaName)
        const order = this.parentNode.parentNode.childNodes[5].innerText
        const completed = this.parentNode.parentNode.childNodes[15].innerText
        fetch('cafe', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'baristaName': baristaName,
            'order'      : order,
            'completed': completed
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
