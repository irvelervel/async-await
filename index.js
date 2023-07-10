// il pattern async/await è una metodologia alternativa per la gestione delle Promise
// vi permette di "trattare" codice asincrono come se fosse sincrono

const myUrl = 'https://jsonplaceholder.typicode.com/todos'

// approccio che già conosciamo, con i .then() e il .catch()
const getTodosClassic = function () {
  fetch(myUrl)
    .then((res) => {
      console.log('questa è la response dal server', res)
      if (res.ok) {
        return res.json() // "jsonifizza" il body della response
      } else {
        // in caso di errore dal server
        // ci auto-lanciamo nel .catch
        throw new Error('Errore nella response')
      }
    })
    .then((data) => {
      console.log('ecco i todos', data)
    })
    .catch((err) => {
      console.log('si è verificato un errore', err)
    })
}

// getTodosClassic()

// approccio nuovo con async/await
const getTodosAsyncAwait = async function () {
  try {
    // la parola chiave "await" permette di "aspettare" una Promise prima della prosecuzione del codice
    let response = await fetch(myUrl)
    // alla riga successiva, il valore tornato dalla Promise è già disponibile
    console.log('RESPONSE', response)
    if (response.ok) {
      // applico gli stessi controlli che facevo prima, perchè può essere che la risposta
      // sia disponibile ma ci sia stato un errore nel server
      let data = await response.json() // "jsonifizza" il body della response
      // alla riga successiva, il valore tornato dalla Promise è già disponibile
      console.log('data', data)
      // qua posso già utilizzare i miei dati per manipolare il dom, creare elementi etc.
      createCards(data)
    } else {
      // in caso di errore dal server
      // ci auto-lanciamo nel .catch
      throw new Error('Errore nella response')
    }
  } catch (err) {
    // questo catch svolge la stessa funzione del .catch() nel metodo precedente
    console.log('si è verificato un errore', err)
  }
}

getTodosAsyncAwait()

// funzione di esempio, vuota
const createCards = function (data) {}
