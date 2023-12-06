//% blockId=Microbit_Car block="Microbit_Car"

//%color="5c6300" weight=25
namespace Microbit_Car {

    //I2C addr
    const Microbit_Car_ADDR = 0x11
    //reg
    const RGB_Light = 0x01
    const BUZZER_State = 0x02
    const BUZZER_Sound = 0x03
    const CAR_STATE= 0x04
	const MOTOR_SPEED = 0x05
	const SERVO_STATE = 0x06
	const WS2812_ALL = 0x07
	const WS2812_Alone =  0x08
	const IRTRACKING = 0x0A

    export enum enColor_RGB {
        //% blockId="Red" block="Red"
        Red = 0,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="Yellow" block="Yellow"
        Yellow,
        //% blockId="Purper" block="Purper"
        Purper,
        //% blockId="Lake" block="Lake"
        Lake,
        //% blockId="White" block="White"
        White,
        //% blockId="OFF" block="OFF"
        OFF
    }

    export enum BEEP_MUSIC {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="ON" block="ON"
        ON,
        //% blockId="Sound1" block="Sound1"
        Sound1,
        //% blockId="Sound2" block="Sound2"
        Sound2,
        //% blockId="Music1" block="Music1"
        Music1,
        //% blockId="Music2" block="Music2"
        Music2,
        //% blockId="Music3" block="Music3"
        Music3,
        //% blockId="Music4" block="Music4"
        Music4,
        //% blockId="Music5" block="Music5"
        Music5
    }

    export enum enCAR_STATE {
        //% blockId="STOP" block="STOP"
        STOP = 0,
        //% blockId="RUN" block="RUN"
        RUN,
        //% blockId="BACK" block="BACK"
        BACK,
        //% blockId="LEFT" block="LEFT"
        LEFT,
        //% blockId="Right" block="Right"
        Right,
        //% blockId="LEFT_SPIN" block="LEFT_SPIN"
        LEFT_SPIN,
        //% blockId="RIGHT_SPIN" block="RIGHT_SPIN"
        RIGHT_SPIN
    }

    export enum enServo_ID_PWM {
        //% blockId="Servo_S5" block="Servo_S5"
        Servo_S5 = 0,
        //% blockId="Servo_S6" block="Servo_S6"
        Servo_S6,
        //% blockId="Servo_S7" block="Servo_S7"
        Servo_S7,
        //% blockId="Servo_S8" block="Servo_S8"
        Servo_S8,
    }

    export enum enColor_WS2812 {
        //% blockId="Red" block="Red"
        Red = 0,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="Yellow" block="Yellow"
        Yellow,
        //% blockId="Purper" block="Purper"
        Purper,
        //% blockId="Orange" block="Orange"
        Orange,
        //% blockId="Indigo" block="Indigo"
        Indigo,
        //% blockId="White" block="White"
        White,
        //% blockId="OFF" block="OFF"
        OFF
    }

    //% blockId=RGB_Car_Big block="RGB_Car_Big|value %value"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value: enColor_RGB): void {
        
        let buf = pins.createBuffer(2);
        buf[0] = RGB_Light;
        buf[1] = value;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);

    }



        //% block="k210_init_SerialPort"
        export function k210_init_SerialPort () 
    {
        serial.redirect(
        SerialPin.P13,
        SerialPin.P14,
        BaudRate.BaudRate115200
        )
    }



}