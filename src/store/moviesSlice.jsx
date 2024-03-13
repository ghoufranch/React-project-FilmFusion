import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



import data from "./db.json"


const initalState = {
    movies :data.movies || [],
    error : null,
    loading : null
}

/*
export const fetchMovies = createAsyncThunk(
    'fetch/movies', async()=>{
        const {data} = await axios.get(API_URL)
        return data
    }
)
*/
const API_URL = "./db,json"
 

export const addMovie = createAsyncThunk(
    'add/movie', async(newmovie)=>{
        console.log(newmovie)
        const {data} = await axios.post(API_URL,newmovie)
        return data
    }
)

export const deleteMovie = createAsyncThunk(
    'delete/movie', async(id)=>{
        console.log(id)
        const {data} = await axios.delete(`${API_URL}/${id}`)
        return data
    }
)


export const updateMovie = createAsyncThunk(
    'update/movie', async(payload)=>{
        const {id , updateMovie} = payload
        console.log('id',id,'update',updateMovie)
        const {data} = await axios.put(`${API_URL}/${id}`,updateMovie)
        return data
    }
)

//  to search about a movie using json-server
export const searchBy = createAsyncThunk(
    'update/movie', async(params)=>{
        console.log(params)
        const {data} = await axios.get(`${API_URL}?`,{params})
        console.log(data)
        return data
    }
)






const moviesSlice = createSlice({
    name : 'movies',
    initialState : initalState,
    reducers : {
        addMovie1: (state, action) => {
            // Assuming the action.payload is the new movie object
            state.movies.push(action.payload);
          },
          deleteMovie1: (state, action) => {
            // Assuming the action.payload is the movie ID
            const id = state.movies.findIndex(movie => movie.id === action.payload);
            if (id !== -1) {
              state.movies.splice(id, 1);
            }
          },
          updateMovie1: (state, action) => {
            // Assuming the action.payload has id and updatedMovie properties
            const { id, updatedMovie } = action.payload;
            const index = state.movies.findIndex(movie => movie.id === id);
            if (index !== -1) {
              state.movies[index] = { ...state.movies[index], ...updatedMovie };
            }
          },
        filter(state,action){
            if (action.payload.type === 'rating-asc'){
                console.log(action.payload.type)
                state.movies.sort((a,b)=>a.Rating - b.Rating)
                return
            }
                
            if (action.payload.type === 'rating-des'){
                console.log(action.payload.type)
                state.movies.sort((a,b)=>b.Rating - a.Rating)
                return
            }


            if (action.payload.type === 'title-asc'){
                console.log(action.payload.type)
                state.movies.sort((a, b) => a.Title.localeCompare(b.Title));
                return
            }
                
            if (action.payload.type === 'title-des'){
                console.log(action.payload.type)
                state.movies.sort((a, b) => b.Title.localeCompare(a.Title));
                return
            }         
        }
    },
    extraReducers: (builder) => {
        builder
       /* .addCase(fetchMovies.pending,(state,action)=>{
            state.loading = 'pending'
        })
        .addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies = action.payload
            state.loading = 'success'
        })
        .addCase(fetchMovies.rejected,(state,action)=>{
            state.loading = 'failed'
            state.error = 'Can not download movies data🤕'
        })*/
        // delete movie
        .addCase(addMovie.fulfilled,(state,action)=>{
          state.movies.push(action.payload)
        })
        .addCase(deleteMovie.fulfilled,(state,action)=>{
            console.log(action.meta.arg)
            const id = state.movies.findIndex(movie=>movie.id === action.meta.arg)
            state.movies.splice(id,1)
            return
        })
        
        // search a movie success
        .addCase(searchBy.fulfilled,(state,action)=>{
            // console.log('results', action.payload)
            state.movies = action.payload
            return
        })

    },
})

export const {filter,addMovie1,deleteMovie1,updateMovie1} = moviesSlice.actions


export const allMovies = state => state.movies.movies
export const allMoviesError = state => state.movies.error
export const allMoviesLoading = state => state.movies.loading

export default moviesSlice.reducer