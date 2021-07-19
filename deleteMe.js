const greetings = new Promise((resolve, reject) => {
    resolve("Hello!");
})

greetings.then((value) => console.log(value)).catch((err) =>console.error(err));