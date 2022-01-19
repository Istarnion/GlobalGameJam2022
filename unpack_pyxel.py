#!/usr/bin/env python3

"""Tool for repacking pyxel files into game ready animation defs"""

import sys
from zipfile import ZipFile
import json


def get_useful_data_and_store_image(inputfile):
    with ZipFile(inputfile) as pyxel:
        with pyxel.open('docData.json') as jsondata:
            data = json.load(jsondata)
            name = data['name'].lower()
            sprite = {
                'image': data['name'].lower(),
                'width': data['canvas']['width'],
                'height': data['canvas']['height'],
                'frameWidth': data['canvas']['tileWidth'],
                'frameHeight': data['canvas']['tileHeight'],
                'anims': {}
            }
            for index, anim in data['animations'].items():
                duration = anim['frameDuration'] / 100
                sprite['anims'][anim['name'].lower()] = {
                    'start': anim['baseTile'],
                    'framedurations': [mult * duration for mult in anim['frameDurationMultipliers']]
                }

        with pyxel.open('layer0.png') as inputimage:
            with open('res/' + name + '.png', 'wb') as outputimage:
                imagebytes = inputimage.read()
                outputimage.write(imagebytes)

    return name, sprite


sprites = {}

for arg in sys.argv[1:]:
    name, sprite = get_useful_data_and_store_image(arg)
    sprites[name] = sprite

with open('res/sprites.json', 'w') as outputfile:
    json.dump(sprites, outputfile, indent=2)

