# from PIL import Image, ImageEnhance, ImageFilter
# import os

# path = "imgs"
# pathOut = "edited"

# for filename in os.listdir(path):
#     img = Image.open(f"{path}/{filename}")

#     edit = img.filter(ImageFilter.SHARPEN)

#     factor = 1.5
#     enhancer = ImageEnhance.Contrast(edit)
#     edit = enhancer.enhance(factor)

#     clean_name = os.path.splitext(filename)[0]

#     edit.save(f"{pathOut}/{clean_name}_edited.jpg")


# from pytube import YouTube
# from sys import argv

# link = argv[1]
# yt = YouTube(link)

# print("Title: ", yt.title)
# print("Views: ", yt.views)

# yd = yt.streams.get_highest_resolution()

# yd.download('.')
# # Kör kommando med URL inom ""

