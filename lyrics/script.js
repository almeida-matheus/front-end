const formLetter = document.getElementById('formLetter');
const inputSong = document.querySelector('#song');
const inputArtist = document.querySelector('#artist');
const buttonLetter = document.querySelector('#button');
const lyricText = document.querySelector('#lyric');
const divLyric = document.querySelector('lyricSong');

//cors > permite q um site use recursos de outros sites msm em dominios diferentes
function findLyrics(artist, song) {
    //retorna uma promise
    console.log(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    let promise = fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    // let url = `https://api.lyrics.ovh/v1/${artist}/${song}`
    // let promise = fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    return promise;
}

formLetter.addEventListener('submit', el => {
    //cancelar o padrão dele q é enviar, fazer o submit
    el.preventDefault();
    doSubmit();
})

//THEN
// function doSubmit() {
//     buttonLetter.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'

//     //encodeURI: transforme space in %20 to get http
//     let valueArtist = encodeURI(inputArtist.value.trim());
//     let valueSong = encodeURI(inputSong.value.trim());
//     if (valueArtist != "" || valueSong != "") {

//         findLyrics(valueArtist, valueSong)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data)
//                 if (data.lyrics) {
//                     document.getElementById("lyricSong").style.display = "block";
//                     lyricText.innerHTML = data.lyrics;
//                     buttonLetter.innerHTML = 'Enviar'
//                 }
//                 else {
//                     // lyricText.innerHTML = data.error;
//                     alert(`erro: ${data.error}`);
//                     buttonLetter.innerHTML = 'Enviar'
//                 }
//             })
//             .catch(err => {
//                 // lyricText.innerHTML = `ops ${err}`;
//                 alert(`erro: ${err}`);
//                 buttonLetter.innerHTML = 'Enviar'
//             })
//     }
//     buttonLetter.innerHTML = 'Enviar'
// }

// ASYNC AWAIT
async function doSubmit() {
    buttonLetter.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    let valueArtist = encodeURI(inputArtist.value.trim());
    let valueSong = encodeURI(inputSong.value.trim());
    if (valueArtist != "" || valueSong != "") {
        try {
            const lyricResponse = await findLyrics(valueArtist, valueSong)
            const data = await lyricResponse.json()
            console.log(data)
            if (data.lyrics) {
                document.getElementById("lyricSong").style.display = "block";
                lyricText.innerHTML = data.lyrics;
                buttonLetter.innerHTML = 'Enviar'
            }
            else {
                // lyricText.innerHTML = data.error;
                alert(data.error);
                buttonLetter.innerHTML = 'Enviar'
            }
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }
    buttonLetter.innerHTML = 'Enviar'
}