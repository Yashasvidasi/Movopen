import requests
#AIzaSyCDpATWobrYtKXlpl4E7e1lRaZv2QCXea0
url = "https://api.themoviedb.org/3/movie/1011985/videos?language=en-US"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI2ZjQ4ZDUxZjMxZmY3ZjkxOWQ1ZGNhNGI3MTE4YSIsInN1YiI6IjY2NDM1ZWQ5MzcxZDAyMjk5OTM1ODE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9l6vyjgQSIDdr_4tQckUixPEoSjaMzevcnvlZWE5Bw"
}

response = requests.get(url, headers=headers)

print(response.text)

api_key = 'AIzaSyCDpATWobrYtKXlpl4E7e1lRaZv2QCXea0'
response = requests.get('https://www.googleapis.com/youtube/v3/search', params={
    'part': 'snippet',
    'q': 'your_search_query',
    'key': api_key
})

# Parse the response and extract video data
videos = []
for item in response.json()['results']:
    video = {
        'iso_639_1': 'en',  # Example language code
        'iso_3166_1': 'US',  # Example country code
        'name': item['snippet']['title'],
        'key': item['id']['videoId'],
        'site': 'YouTube',
        'size': None,  # You may need to determine this based on your requirements
        'type': 'trailer',  # Example video type
        'official': True,  # Example official status
        'published_at': item['snippet']['publishedAt'],
        'id': item['id']['videoId']
    }
    videos.append(video)

# Now you have an array of video objects
print(videos)