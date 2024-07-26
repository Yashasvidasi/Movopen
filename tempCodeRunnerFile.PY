response = requests.get(url, headers=headers, params=params)
for a in response.json():
    print(a)
    c += 1
    print("\n")