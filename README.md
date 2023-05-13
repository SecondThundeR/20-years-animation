# 20 Years Animation

This is an animation created with [Motion Canvas](https://motioncanvas.io) to celebrate my 20th birthday

This animation is made in a minimalistic style, using the concept of "gamification"

![Animation result](/assets/result.gif)

## How to run

```shell
yarn serve
```

## How to render

0. Run `yarn serve` to launch Motion Canvas
1. Use `Render` button in Motion Canvas's Video Settings
2. After render, go to `/output/project` folder where `project.mp4` will be located
3. ...
4. You are done!

> To get GIF, run two commands using `ffmpeg`:
>
> `ffmpeg -y -i project.mp4 -vf palettegen palette.png`
>
> `ffmpeg -y -i project.mp4 -i palette.png -filter_complex paletteuse -r 50 -s 1920x1080 project.gif`

## License

This animation is using [MIT License](https://github.com/SecondThundeR/20-years-animation/blob/main/LICENSE)
