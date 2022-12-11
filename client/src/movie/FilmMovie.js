import {makeAutoObservable} from "mobx";

export default class FilmMovie{
    constructor() {
        this.list = []
        this.actor = []
        this.reviews =[]
        this._films = []
        this.listfilm = []
        this.movie = []
        this.actorFilm = []
        this.page = 1
        this.totalCount = 0
        this._limit = 4

        this.estimate = [
            {id:1,name:"Положительная"},
            {id:1,name:"Нейтральная"},
            {id:1,name:"Отрицательная"},
        ]
        this._selectedEstimate = {}

        makeAutoObservable(this)
    }

    setList(list){
        this.list = list
    }

    setMovie(movie){
        this.movie = movie
    }

    setActorFilm(actorFilm){
        this.actorFilm = actorFilm
    }

    setListFilm(listfilm){
        this.listfilm = listfilm
    }

    setFilms(films){
        this._films = films
    }
    setActor(actor){
        this.actor = actor
    }
    setReview(review){
        this.reviews = review
    }

    setPage(page){
        this.page = page
    }

    setTotalCount(totalCount){
        this.totalCount = totalCount
    }

    setSelectedEstimate(estimate){
        this._selectedEstimate = estimate
    }

    get List(){
        return this.list
    }

    get Movie(){
        return this.movie
    }

    get ListFilm(){
        return this.listfilm
    }

    get Films(){
        return this._films
    }
    get Actor(){
        return this.actor
    }

    get selectedEstimate(){
        return this._selectedEstimate
    }

    get Review(){
        return this.reviews
    }

    get Page(){
        return this.page
    }

    get TotalCount(){
        return this.totalCount
    }

    get limit(){
        return this._limit
    }


}