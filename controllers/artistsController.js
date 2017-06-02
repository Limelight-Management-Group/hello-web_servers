var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
let fs = require('fs');
let path = require('path');
let songs = require('../database/faux-data/songs.json')
let albums = require('../database/faux-data/albums.json')
let artists = require('../database/faux-data/artists.json')
let albumsName = require('../database/faux-data/albums.json')


module.exports = function(app){
app.get('/', (req, res) =>{

	res.render('index');
})
app.get('/songs', (req, res) =>{
	// console.log('this is the songs', songs);
	songs.forEach(song => {
	song.album = albums.filter(album => album.id === song.album_id)[0]

		artists.forEach(artist => {
			if(artist.id === song.album.id) {
				song.artistName = artist.name

			}
		})	
	})
	res.render('songs', {songs})
})
app.get('/albums', (req, res) =>{
	// console.log('this is the albums', albums);
	albums.forEach(album => {
		album.count = 0;
		album.artistName = artists.filter(artist => artist.id === album.artist_id)[0].name
		// console.log(album.artistName.name)
		songs.forEach(song => {
			if(song.album_id === album.id) {
				album.count++
				album.artist_id
			}	
		})
		console.log('this is the album id: ', album.artist_id) 
	}) 
	res.render('albums', {albums} )
})
app.get('/artists', (req, res) =>{
	// console.log('this is the artists', artists);
	artists.forEach(artist => {
		artist.count = 0;
		artists.number = albums.filter(album => artist.id === album.artist_id)
		// console.log(artists.number)
		albums.forEach(album => {
			if(album.artist_id === artist.id) {
				artist.count++
			}	
		}) 
				// console.log('this is the album count: ', artist.count)
	})	
	res.render('artists', {artists})
})

app.get('/artists/:id', (req, res) => {
	// console.log('these are the params: ', req.params)
	const id = parseInt(req.params.id);
	const artistShow = artists.filter(artist => id === artist.id)[0]
	// console.log('these are the artists: ', artistShow)

	// artistShow.forEach(artist => {
		// artist.count = 0;
		artistShow.albums = albums.filter(album => id === album.artist_id)
// console.log("artists show: ",artistShow.albums)
		artistShow.albums.forEach(album => {

		album.count = songs.filter(song => album.id === song.album_id).length

		})
	
		// console.log(artistShow)	
		res.render('artist_show', {artistShow})	
})
app.get('/albums/:album_id', (req, res) => {
	// console.log('these are the params: ', req.params)
	const albumId = parseInt(req.params.album_id);
	const albumShow = albums.filter(album => albumId === album.id)[0]
	// console.log('these are the albums: ', albumShow)

	
		// const artistName = albumShow.filter(album => albumId === album.album_id)
		// console.log("albums show: ", albumShow.artistId)
		// console.log(artistName)
		// artistName.forEach(album => {

		let artistName = artists.filter(artist => albumShow.artist_id === artist.id)[0].name
		let albumSongs = songs.filter(song => albumId === song.album_id)
		// let trackNumber = albumSongs.forEach( track)
		let count = albumSongs.length
		// })
		// albums.forEach(album => {
		// 	if(album.id === song.albumId) {
		// 		song.albumName = album.name
		// 	}
	
		// console.log(artistName)	
		res.render('albumShow', {albumShow, artistName, albumSongs, count})
	
})

var artistDataReadStream = fs.readFile('./database/faux-data/songs.json', (req, res) =>{

});
// var artistDataWriteStream = fs.createWriteStream('')
// 	console.log(artistDataReadStream)
// artistDataReadStream.on('data', (chunk) => {
// 	console.log('new chunk recieved!')
// 	console.log(chunk);
// })
};
