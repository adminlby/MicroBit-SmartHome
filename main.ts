let Value_light = 0
let lightstatus = 0
function Readlight () {
    Value_light = input.lightLevel()
    lightstatus = 0
}
// Open all light when press A
input.onButtonPressed(Button.A, function () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    music.setVolume(255)
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.pause(500)
    music.stopAllSounds()
})
function Light () {
    if (input.lightLevel() <= 30) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
// Shut down all light when press B
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    music.setVolume(255)
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.pause(1000)
    music.stopAllSounds()
})
radio.onReceivedValue(function (name, value) {
    basic.clearScreen()
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    for (let index = 0; index < 999999999999; index++) {
        let receivenumlight = 0
        if (receivenumlight == 75) {
            if (name == "light" && value == 1) {
                pins.digitalWritePin(DigitalPin.P0, 1)
            }
            if (name == "light" && value == 0) {
                pins.digitalWritePin(DigitalPin.P0, 0)
            }
        } else {
            break;
Light()
            Readlight()
        }
    }
})
basic.forever(function () {
    Light()
    Readlight()
    basic.showNumber(input.lightLevel())
    radio.setGroup(100)
})
