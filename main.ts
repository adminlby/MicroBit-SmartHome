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
    if (input.lightLevel() <= 50) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
// Shut down all light when press B
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.pause(1000)
    music.stopAllSounds()
})
basic.forever(function () {
    Light()
    Readlight()
    basic.pause(2000)
    basic.showNumber(input.lightLevel())
    basic.pause(2000)
    basic.showNumber(pins.digitalReadPin(DigitalPin.P0))
})
