# 20 Years Animation

This is an animation created with [Motion Canvas](https://motioncanvas.io) to celebrate my 20th birthday

This animation is made in a minimalistic style, using the concept of "gamification"

![Animation result](/assets/result.gif)

## How to run

```shell
yarn serve
```

## How to render

1. Use `render` feature in Motion Canvas's UI
2. Go to /output/project folder in Terminal
3. Type `ffmpeg -framerate 60 -i %06d.png -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p ./test.mp4` and wait
4. Get `test.mp4` as a video render output

> To get GIF, just run two more commands:
>
> `ffmpeg -y -i test.mp4 -vf palettegen palette.png`
>
> `ffmpeg -y -i test.mp4 -i palette.png -filter_complex paletteuse -r 50 -s 1920x1080 test.gif`

## License

This animation is using [MIT License](https://github.com/SecondThundeR/20-years-animation/blob/main/LICENSE)
