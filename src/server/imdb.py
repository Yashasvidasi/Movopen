import logging
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from tenacity import retry, stop_after_attempt, wait_fixed

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI2ZjQ4ZDUxZjMxZmY3ZjkxOWQ1ZGNhNGI3MTE4YSIsInN1YiI6IjY2NDM1ZWQ5MzcxZDAyMjk5OTM1ODE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9l6vyjgQSIDdr_4tQckUixPEoSjaMzevcnvlZWE5Bw"
}

# Retry decorator with 3 retries, waiting 2 seconds between retries
@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
def make_request(url, type="movie"):
    logging.info(f"Requesting URL: {url}")
    try:
        response = requests.get(url, headers=headers, timeout=20)
        response.raise_for_status()  # Raise an error for unsuccessful response status codes
        if(type == "movie"):
            return (response.json()["results"])
        elif(type == "lang"):
            return (response.json())
        elif(type == "cast"):
            return (response.json()["cast"])
        elif(type == "details"):
            return (response.json())
        else:
            return(response.json()["genres"])
    except requests.exceptions.RequestException as e:
        logging.error(f"Request failed: {e}")
        raise

def get_actors(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/credits?language=en-US"
    return make_request(url, "cast")

def sort_languages_by_english_name(languages):
    return sorted(languages, key=lambda x: x['english_name'])

def get_language():
    url = "https://api.themoviedb.org/3/configuration/languages"
    return sort_languages_by_english_name(make_request(url, "lang"))

def get_trending():
    url = "https://api.themoviedb.org/3/trending/all/week?"
    return make_request(url)

def get_trailer_movie(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/videos?language=en-US"
    return make_request(url)

def get_trailer_tv(id):
    url = f"https://api.themoviedb.org/3/tv/{id}/videos?language=en-US"
    return make_request(url)

def get_popular_movies(page):
    url = f"https://api.themoviedb.org/3/movie/popular?page={page}"
    return make_request(url)

def get_new_movies(page):
    url = f"https://api.themoviedb.org/3/movie/now_playing?page={page}"
    return make_request(url)

def get_top_movies(page):
    url = f"https://api.themoviedb.org/3/movie/top_rated?page={page}"
    return make_request(url)

def get_popular_tv(page):
    url = f"https://api.themoviedb.org/3/tv/popular?page={page}"
    return make_request(url)

def get_new_tv(page):
    url = f"https://api.themoviedb.org/3/tv/on_the_air?page={page}"
    return make_request(url)

def get_top_tv(page):
    url = f"https://api.themoviedb.org/3/tv/top_rated?page={page}"
    return make_request(url)

def get_search(name,page):
    url = f"https://api.themoviedb.org/3/search/multi?query={name}&include_adult=false&language=en-US&page={page}&sort_by=popularity.desc"
    return make_request(url)

def get_tv_genre():
    url = "https://api.themoviedb.org/3/genre/tv/list?language=en"
    return make_request(url, "genre")

def get_movie_genre():
    url = "https://api.themoviedb.org/3/genre/movie/list?language=en"
    return make_request(url, "genre")

def get_both_genre():
    movie_genres = get_movie_genre()
    tv_genres = get_tv_genre()
    
    # Concatenate the lists
    all_genres = movie_genres + tv_genres
    
    # Remove duplicates based on genre ID
    unique_genres = {genre['id']: genre for genre in all_genres}.values()
    
    print(unique_genres)
    return list(unique_genres)

def get_filter_movie(d, number):
    if(d['year'] == ""):
        year = ""
    else:
        year = f"&primary_release_year={d["year"]}"
    if(d['genre'] == ""):
        genre = ""
    else:
        genre = f"&with_genres={d["genre"]}"
    if(d['lang'] == ""):
        lang = ""
    else:
        lang = f"&with_original_language={d["lang"]}"
    url = f"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page={number}{year}&sort_by={d["sort"]}.{d["order"]}{genre}{lang}"
    print(url)
    return make_request(url)
def get_filter_tv(d, number):
    if(d['year'] == ""):
        year = ""
    else:
        year = f"first_air_date_year={d["year"]}&"
    if(d['genre'] == ""):
        genre = ""
    else:
        genre = f"&with_genres={d["genre"]}"
    if(d['lang'] == ""):
        lang = ""
    else:
        lang = f"&with_original_language={d["lang"]}"

    url = f"https://api.themoviedb.org/3/discover/tv?{year}include_adult=false&language=en-US&page={number}&sort_by={d["sort"]}.{d["order"]}{genre}{lang}"
    return make_request(url)

def get_filter(d, number):
    print("here")
    if(d["type"] == "Series/Movies"):
        movies = get_filter_movie(d, number)
        tv = get_filter_tv(d, number)
        all = movies + tv
        return list(all)
    elif (d["type"] == "Movies"):
        
        return get_filter_movie(d, number)
    else:
        return get_filter_tv(d, number)
    
def get_details(id):
    url = f"https://api.themoviedb.org/3/movie/{id}?language=en-US"
    return make_request(url, "details")

def get_providers(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/watch/providers?locale=IN"
    return make_request(url)

def get_recc(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/similar?language=en-US&page=1"
    return make_request(url)

def get_reviews(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/reviews?language=en-US&page=1"
    return make_request(url)

def get_countries():
    url = "https://api.themoviedb.org/3/configuration/countries?language=en-US"
    return make_request(url, "details")

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json
    command = data.get('command')
    number = data.get('number')
    id = data.get('id')
    d = data.get("data")

    logging.info(f"Received command: {command}, number: {number}, id: {id}")

    try:
        if command == 'popular':
            result = get_popular_movies(number)
        elif command == 'top':
            result = get_top_movies(number)
        elif command == 'new':
            result = get_new_movies(number)
        elif command == 'populartv':
            result = get_popular_tv(number)
        elif command == 'toptv':
            result = get_top_tv(number)
        elif command == 'newtv':
            result = get_new_tv(number)
        elif command == 'hover':
            result = get_trailer_movie(id)
        elif command == 'hovertv':
            result = get_trailer_tv(id)
        elif command == 'trending':
            result = get_trending()
        elif command == "search":
            result = get_search(id, number)
        elif command == "Movies":
            result = get_movie_genre()
        elif command == "lang":
            result = get_language()
        elif command == "Series":
            result = get_tv_genre()
        elif command == "Series/Movies":
            result = get_both_genre()
        elif command == "searchgenre":
            result = get_filter(d, number)
        elif command == "getcast":
            result = get_actors(id)
        elif command == "getdetails":
            result = get_details(id)
        elif command == "getproviders":
            result = get_providers(id)
        elif command == "recc":
            result = get_recc(id)
        elif command == "review":
            result = get_reviews(id)
        elif command == "country":
            result = get_countries()
        else:
            return jsonify({"error": "Invalid command"}), 400

        response = jsonify({"sol": result})
        response.headers['X-Content-Type-Options'] = 'nosniff'
        return response

    except requests.exceptions.HTTPError as e:
        logging.error(f"HTTP error occurred: {e}")
        return jsonify({"error": "Resource not found"}), 404
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)
