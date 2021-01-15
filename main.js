window.app = new Vue({
    el: '#app',
    data: {
    name: '',
    movie: {},
    selectedMovie: {},
    search:'',
    nominatedMovie: [],
    },
    created:  function (){
        this.nominatedMovie = this.localStorageQuery() ?? [];
    },

    methods: {
        clickedButton : function (){
            this.searchUpdate();
        },
        addNomination : function (index){
            if (this.nominatedMovie.length <= 4){
            this.nominatedMovie.push(this.movie.Search[index])
            }
        },
        removeNomination : function (index){
            this.nominatedMovie.splice(index,1)
            // console.log(index)
        },
        removeselectedNomination : function (movieID){
            this.nominatedMovie.forEach((element,index)  => {
            if(element.imdbID === movieID){
                this.nominatedMovie.splice(index,1)
            }
            });

        },
        movieDetails: function (index){
            axios.get('https://the-shoppies-challenge-uxui.netlify.app/api.php?query='+this.search)
            .then((response) =>{
                this.selectedMovie = response.data
                console.log(this.movie)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        },
        searchUpdate : function (){
            axios.get('https://the-shoppies-challenge-uxui.netlify.app/api.php?query='+this.search)
              .then((response) =>{
                  this.movie = response.data
                  console.log(this.movie)
              })
              .catch(function (error) {
                  // handle error
                  console.log(error);
              });
        },
        localStorageQuery : function () {
            return JSON.parse( localStorage.getItem('nominated') );
            
        },
        localStorageCreate : function() {
            localStorage.setItem("nominated", JSON.stringify(this.nominatedMovie));
            // this.localStorageList();
        },
    },
    computed: {
        showAlert() {
        if (this.nominatedMovie.length == 5){
            return true
        }
        },
        nominationID(){
        return this.nominatedMovie.map(x => x.imdbID)
        },
    }
})