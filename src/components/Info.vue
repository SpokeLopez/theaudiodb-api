<template>
    <div class="max-w-5xl flex items-center h-auto lg:h-screen flex-wrap mx-auto lg:my-0">
        <!--Main Col-->
        <div id="profile" class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-100 mx-6 lg:mx-0">
            <div class="p-4 md:p-12 text-center lg:text-left">
                <!-- Image for mobile view -->
                <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" :style="{'background-image': 'url('+image+')'}"></div>
                <div class="form-inline flex flex-wrap content-between">
                    <input class="font-bold pt-8 lg:pt-0 justify-center mb-0 w-3/4 rounded shadow" v-model="querry" placeholder="Busqueda" />
                    <button @click.prevent="newSearch()" class="bg-blue-500 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-1/4">
                     Buscar
                </button>
                    <span v-if="buscando">
                    Buscando ....
                </span>
            </div>
    
                <div class="form-inline flex flex-wrap content-between">
                    <span class="w-2/4 pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/></svg> Bibliografia</span>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold mt-2 py-2 px-4 border border-gray-400 rounded shadow w-2/4" @click="showModal">Buscar Letra</button>
                    <Lyrics v-show="isModalVisible" @close="closeModal" :name="querry" ref="Lyrics" :songs="songs" />
                </div>
    
                <p class="description pt-8 text-sm"> {{description | formateo}}</p>
            </div>
    
        </div>
    
        <!--Img Col-->
        <div class="w-full lg:w-2/5">
            <!-- Big profile image for side bar (desktop) -->
            <img :src="image" class="image-band shadow-2xl hidden lg:block">
        </div>
    
    </div>
</template>

<script>
import Lyrics from './Lyrics.vue';

export default {
    components: { Lyrics },
    name: 'Info',
    data() {
        return {
            querry: '',
            buscando: false,
            Name: '',
            image: '',
            description: '',
            imag: [],
            isModalVisible: false,
            idArtist: '',
            albumId: '',
            songs: []
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
            this.$refs.Lyrics.BuscarLetra()
        },
        closeModal() {
            this.isModalVisible = false;
        },
        newSearch() {
            this.buscando = true
            const URL = 'https://www.theaudiodb.com/api/v1/json/2/search.php?s=' + this.querry
            fetch(URL)
                .then(response => response.json())
                .then(({ artists }) => {
                    this.buscando = false
                    console.log(artists)

                    if (artists) {
                        this.idArtist = artists[0].idArtist
                        this.image = artists[0].strArtistThumb
                        if (artists[0].strBiographyES) {
                            this.description = artists[0].strBiographyES
                        } else {
                            this.description = artists[0].strBiographyEN
                        }
                        this.$parent.Url = artists[0].strArtistFanart
                    } else {
                        this.image = 'http://4.bp.blogspot.com/-CuZOfJdrDKY/UYmig8q88yI/AAAAAAAAEZM/bzVtIKPhXVA/s1600/Satoshi-nakamoto.gif'
                        this.description = 'Descripción no disponible'
                        this.$parent.Url = 'https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?size=626&ext=jpg&ga=GA1.2.1991903213.1617148800'
                    }
                    this.buscando = false
                    this.GetAlbums()
                })
                .catch(function(error) {
                    console.log('Hubo un problema con la petición:' + error.message);
                });
        },
        GetAlbums() {
            const newUrl = 'https://theaudiodb.com/api/v1/json/2/album.php?i=' + this.idArtist
            console.log(newUrl)
            fetch(newUrl)
                .then(response => response.json())
                .then(({ album }) => {
                    if (album) {
                        this.albumId = album[0].idAlbum
                    }
                    this.getSong()
                })
                .catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                });
        },
        getSong() {
            const newUrl = 'https://theaudiodb.com/api/v1/json/2/track.php?m=' + this.albumId
            console.log(newUrl)
            fetch(newUrl)
                .then(response => response.json())
                .then(({ track }) => {
                    if (track) {
                        this.songs = track
                    }
                })
                .catch(function(error) {
                    console.log('Hubo un problema con la petición:' + error.message);
                });
        }
    },
    filters: {
        formateo(value) {
            return value.substring(0, 700) + '...'
        }
    },
    mounted() {
        this.querry = "Coldplay"
        this.newSearch()
    },
}
</script>

<style>
.image-band{
    border: 3px solid white;
    border-radius: 3.5rem;
}
.description{
    letter-spacing: 1px;
    font-style: oblique;
}
</style>