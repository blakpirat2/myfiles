$(document).ready(function(){
    
    const player = document.getElementById("playNow");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeDisplay = document.getElementById("volume-display"); // Optional
    
    volumeSlider.addEventListener("input", () => {
        player.volume = volumeSlider.value;
        updateVolumeDisplay(); // Optional
    });
    
    function updateVolumeDisplay() {
        volumeDisplay.textContent = `Volume: ${Math.floor(player.volume * 100)}%`;
    };
    
    var currentlyPlayingTitle = '';
    var currentlySelectedSong = '';
    var currentID = '';
    var currentPlayingURL = '';
    var currentClassName = '';
    var currentSource = '';
    var $listItems = $('li');
    var sprezz = new Object();
    var songToPlay = '';
    var songName = '';
    var lyricSongTitle = '';
    var songLyrics = '';
    var playerID ='';
    
    let trackIndex = 0;
    let isRepeatTrack = false;
    let isRepeatAll = false;
    let isShuffle = false;
    
    function showLyrics() {
        switch (currentlyPlayingTitle) {
            case 'blood (conditional pt. 2)':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/blood_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'object permanence':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/object permanence_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'mood journal':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/moodjournal_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'mercury':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/mercury_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            
            case 'kombucha':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/kombucha_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'swing along':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/swingalong_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'luka doncic (king of cups)':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/lukadoncic_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'stegosaurus':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/stegosaurus_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'personal porn star':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/personalpornstar_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'conditional':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/conditional_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'sprezzatura':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/sprezzatura_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'first house':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/main/firsthouse_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            case 'hexagram 23':
                $.get('https://raw.githubusercontent.com/blakpirat2/myfiles/refs/heads/main/hexagram%2023_textedit.html', function (text) {
                    $("#lyric").html(text);
                });
                break;
            default:
                $("#lyric").html("");
        }
    };
    
    function updateButtonText() {
        const checkEmoji = "\nyes";
        const exedEmoji = "\nno";
        document.getElementById('repeatTrack').textContent = isRepeatTrack ? "repeat one: " + checkEmoji : "repeat one: " + exedEmoji;
        document.getElementById('repeatAll').textContent = isRepeatAll ? "repeat all: " + checkEmoji : "repeat all: " + exedEmoji;
        document.getElementById('shuffle').textContent = isShuffle ? "shuffle all: " + checkEmoji : "shuffle all: " + exedEmoji;
    }
    
    function switchSongTitle() {
        lyricSongTitle = document.getElementById('songTitle');                      // takes the songtitle header in the lyrics section and makes it the name of the song playing
        // alert(lyricSongTitle.textContent);
        
        lyricSongTitle.textContent = currentlyPlayingTitle;
        
        // alert(lyricSongTitle.textContent);
        // alert(currentlyPlayingTitle);
    };
    
    let trackList = Array.from($listItems).map((item, index) => ({
        id: item.id,
        src: item.getAttribute('src'),
        title: item.textContent,
        index: index
    }));
    
    let updatePlayer = (index) => {
        let track = trackList[index];
        if (!track) return;
        
        trackIndex = index;
        console.log(track);
        console.log(trackIndex);
        console.log(index);
        player.src = track.src;
        $('#musicPlayerTitle').text(track.title);
        player.play();
        $('#songTitle').text(track.title);
        currentlyPlayingTitle = document.getElementById('musicPlayerTitle').textContent;
        
        songLyrics = document.getElementById('lyric');                         		 // grabs the #lyric paragraph where the lyrics will go
        songLyrics.innerHTML = "";
        
        showLyrics();
        
    };
    
    let onLoadPlayer = (index) => {
        let track = trackList[index];
        if (!track) return;
        
        trackIndex = index;
        
        console.log(track);
        console.log(trackIndex);
        console.log(index);
        player.src = track.src;
        $('#musicPlayerTitle').text(track.title);
        player.pause();
        $('#songTitle').text(track.title);
        currentlyPlayingTitle = document.getElementById('musicPlayerTitle').textContent;
        
        
        songLyrics = document.getElementById('lyric');                         		 // grabs the #lyric paragraph where the lyrics will go
        songLyrics.innerHTML = "";
        
        showLyrics();
    };
    
    let randomIndex = Math.floor(Math.random() * trackList.length);
    
    onLoadPlayer(randomIndex);
        
    // Function to update the active <li> element based on the currently playing song
    function updateActiveTrack() {
        const playerSrc = player.src; // Get the current source of the audio player
        const tracklistEntries = document.querySelectorAll('.fullSong'); // Select all <li> elements
        
        tracklistEntries.forEach((item) => {
            if (item.getAttribute('src') === playerSrc) {
                // If the src matches, apply the active styles
                item.style.backgroundColor = 'white';
                item.style.color = 'black';
            } else {
                // Reset the styles for non-active items
                item.style.backgroundColor = '';
                item.style.color = '';
            }
        });
    }

    // Call updateActiveTrack whenever a new track starts playing
    player.addEventListener('play', updateActiveTrack);
    player.addEventListener('loadeddata', updateActiveTrack); // Update when new track loads
    
    console.log("Track List:", trackList);
    console.log("Update Player Function:", updatePlayer);
    console.log("Player Element:", player);
    console.log("First Track Source:", trackList[0]?.src);
    
    $('#previousTrack').on('click', () => {
        // Get the current title from #musicPlayerTitle
        const currentTitle = $('#musicPlayerTitle').text();
        
        // Find the index of the current track in the trackList
        const currentIndex = trackList.findIndex(track => track.title === currentTitle);
        
        // Log for debugging purposes
        console.log('Current Title:', currentTitle);
        console.log('Current Index:', currentIndex);
        
        // Calculate the previous track index
        const previousIndex = (currentIndex - 1 + trackList.length) % trackList.length;
        
        // Update the player with the previous track
        updatePlayer(previousIndex);
    });
    
    $('#nextTrack').on('click', () => {
        // Get the current title from #musicPlayerTitle
        const currentTitle = $('#musicPlayerTitle').text();
        
        // Find the index of the current track in the trackList
        const currentIndex = trackList.findIndex(track => track.title === currentTitle);
        
        // Log for debugging purposes
        console.log('Current Title:', currentTitle);
        console.log('Current Index:', currentIndex);
        
        let nextIndex = "";
        
        if (isShuffle) {
            // Shuffle mode: select a random track
            nextIndex = Math.floor(Math.random() * trackList.length);
        } else if (currentIndex === trackList.length - 1 && isRepeatAll) {
            // If on the last track and repeat all is enabled, wrap to the first track
            nextIndex = 0;
        } else {
            // Otherwise, proceed to the next track or wrap normally
            nextIndex = (currentIndex + 1) % trackList.length;
        }
        
        // Update the player with the next track
        updatePlayer(nextIndex);
    });
    
    $('#repeatAll').on('click', () => {
        isRepeatAll = !isRepeatAll; // Toggle the repeat-all mode
        isRepeatTrack = false; // Ensure repeat track mode is off
        console.log(`Repeat All: ${isRepeatAll}`);
        updateButtonText(); // Update UI button text or styles
    });
    
    $('#repeatTrack').on('click', () => {
        isRepeatTrack = !isRepeatTrack;
        isRepeatAll = false;
        console.log(`Repeat Track: ${isRepeatTrack}`);
        updateButtonText();
        });

    $('#shuffle').on('click', () => {
        isShuffle = !isShuffle;
        console.log(`Shuffle: ${isShuffle}`);
        updateButtonText();
       
    });
    
    player.addEventListener('ended', () => {
        if (isRepeatTrack) {
            player.play();
        } else if (isShuffle) {
            $('#nextTrack').trigger('click');
        } else if (isRepeatAll) {
            trackIndex = (trackIndex + 1) % trackList.length;
            updatePlayer(trackIndex);
        } else if (trackIndex < trackList.length - 1) {
            trackIndex++;
            updatePlayer(trackIndex);
        } else {
            console.log('Playback ended.');
        }
    });
    
    $listItems.on('dblclick', function() {
        
        
        currentlyPlayingTitle = this.textContent;                                   // defines variable as the double-clicked song title
        currentlySelectedSong = document.getElementById('musicPlayerTitle');        // grabs the song title on music player
        currentlySelectedSong.textContent = currentlyPlayingTitle;                  // injects the double-clicked song title into the music player
        
        currentID = this.id;                                                        // makes variable the ID of the song playing
        // alert(currentID);                                                           // alerts to show current ID
        
        currentSource = this.getAttribute('src');                                   // gets the HTML source of the chosen song
        // alert(currentSource);                                                       // alert to show HTML source
        
        var audioID = document.getElementsByTagName('audio').item(0).id;            // grabs the ID of the audio player
        // alert(audioID);                                                             // alerts with the ID of the audio player (#playNow)
        
        playerID = document.getElementById('playNow');                         		// grabs the #playNow element (this seems redundant and provides Object HTML Audio Element, but may be neceesary?)
        // alert(playerID);                                                            // alerts #playNow element
        
        playerID.src = currentSource;                                               // injects the double-clicked song's HTML source into the music player's source
        
        var playerCheck = playerID.getAttribute('src');                             // gets the HTML source of the song playing in the *updated* music player
        // alert(playerCheck);                                                         // alerts said HTML source
        
        switchSongTitle();

        songLyrics = document.getElementById('lyric');                         		 // grabs the #lyric paragraph where the lyrics will go
        // alert(songLyrics.textContent);
        
        showLyrics();
        
        playNow.volume = 0.3;
        playNow.play();   // plays the song (do I wannna adjust volume?)
        
    });										 // closes this double-click function
    
});


