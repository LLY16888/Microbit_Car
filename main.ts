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

    export enum SOUND_LEVEL {
        //% blockId="LEVEL1" block="LEVEL1"
        LEVEL1 = 0x02,
        //% blockId="LEVEL2" block="LEVEL2"
        LEVEL2 = 0x04,
         //% blockId="LEVEL3" block="LEVEL3"
        LEVEL3 = 0x06
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

    export enum enServo_PWM_ID {
        //% blockId="Servo_S1" block="Servo_S1"
        Servo_S1 = 0,
        //% blockId="Servo_S2" block="Servo_S2"
        Servo_S2,
        //% blockId="Servo_S3" block="Servo_S3"
        Servo_S3,
        //% blockId="Servo_S4" block="Servo_S4"
        Servo_S4,
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
    export enum enWS2812_State {
        //% blockId="Close" block="Close"
        Close = 0,
        //% blockId="OPEN" block="OPEN"
        OPEN
    }

    export enum enIRtrack_State {
        //% blockId="Black_Line" block="Black_Line"
        Black_Line = 0,
        //% blockId="White_Line" block="White_Line"
        White_Line
    }

    export enum enIRtrack_Position {
        //% blockId="LeftMost" block="LeftMost"
        LeftMost = 0,
        //% blockId="Left" block="Left"
        Left ,
        //% blockId="Right" block="Right"
        Right ,
        //% blockId="RightMost" block="RightMost"
        RightMost,
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

    function BBEP_OFF():void{
        let buf = pins.createBuffer(2);
        buf[0] = BUZZER_State;
        buf[1] = 0x00;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
    }

    //% blockId=BEEP_Play block="BEEP_Play|value %value"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function BEEP_Play(value: BEEP_MUSIC): void {
        let buf = pins.createBuffer(2);
        buf[0] = BUZZER_State;
        buf[1] = value;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
    }

    //% blockId=BEEP_Sound block="BEEP_Sound|Timbre %Timbre |Sound_level %level|time(ms) %time"
    //% weight=98
    //% blockGap=10
    //% Timbre.min=0 Timbre.max=1000 
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function BEEP_Sound(Timbre:number,level:SOUND_LEVEL,time:number): void {
        let buf = pins.createBuffer(4);
        buf[0] = BUZZER_Sound;  
        buf[1] = (Timbre >>8)&0x0F;
        buf[2] = Timbre & 0x00FF;
        buf[3] = level;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);

        basic.pause(time);//响多久
        BBEP_OFF();
    }

    //% blockId=Car_Sport block="Car_Sport|value %value|speed %speed"
    //% weight=98
    //% blockGap=10
    //% speed.min=0 speed.max=1000 
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Sport(value: enCAR_STATE,speed:number): void {
        let buf = pins.createBuffer(4);
        buf[0] = CAR_STATE;
        buf[1] = value;
        buf[2] = (speed >>8) & 0x0F;
        buf[3] = speed & 0x00FF;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
    }

    //% blockId=Car_Sport_motor block="Car_Sport_motor|L_Motor %speed_L|R_Motor %speed_R"
    //% weight=98
    //% blockGap=10
    //% speed_L.min=-1000 speed_L.max=1000 speed_R.min=-1000 speed_R.max=1000 
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Sport_motor(speed_L:number,speed_R:number): void {
        let buf = pins.createBuffer(7);
        buf[0] = MOTOR_SPEED;
        
        //左边电机
        buf[1] = (speed_L >>8) &0x0F;
        buf[2] = speed_L &0x00FF;
        if(speed_L < 0)
            buf[3] = 1;  //反转
        else buf[3] = 0; //正转

        //右边电机
        buf[4] = (speed_R >>8) & 0x0F;
        buf[5] = speed_R & 0x00FF;
        if(speed_R < 0)
            buf[6] = 1; //反转
        else buf[6] = 0;//正转

        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
    }

    //% blockId=Set_PWM_Servo block="Set_PWM_Servo(S5-S8)|servo %value|angle %angle"
    //% weight=98
    //% blockGap=10
    //% angle.min=0 angle.max=180 
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Set_PWM_Servo(value:enServo_ID_PWM,angle:number): void {
        let buf = pins.createBuffer(3);
        buf[0] = SERVO_STATE;
        buf[1] = value;
        buf[2] = angle;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
    }

    //% blockId=Set_Servo_PWM block="Set_PWM_Servo(S1-S4)|servo %value|angle %angle"
    //% weight=98
    //% blockGap=10
    //% angle.min=0 angle.max=180 
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Set_Servo_PWM(value:enServo_PWM_ID,angle:number): void {
        switch(value)
        {
            case enServo_PWM_ID.Servo_S1:
                pins.servoWritePin(AnalogPin.P0, angle)
                break

            case enServo_PWM_ID.Servo_S2:
                pins.servoWritePin(AnalogPin.P1, angle)
                break

            case enServo_PWM_ID.Servo_S3:
                pins.servoWritePin(AnalogPin.P2, angle)
                break

            case enServo_PWM_ID.Servo_S4:
                pins.servoWritePin(AnalogPin.P12, angle)
                break

        }
        
    }

    //% blockId=Set_WS2812_RGB_ALL block="Set_WS2812_RGB_ALL|state %value|color %color"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Set_WS2812_RGB_ALL(value:enWS2812_State,color:enColor_WS2812): void {
        let buf = pins.createBuffer(3);
        buf[0] = WS2812_ALL;
        buf[1] = value;
        buf[2] = color;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
        //basic.pause(10);//防止DMA太快,并没有出现
    }

    //% blockId=Set_WS2812_RGB_Alone block="Set_WS2812_RGB_Alone|RGB_index %index|state %value|color %color"
    //% weight=98
    //% blockGap=10
    //% index.min=0  index.max=3
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Set_WS2812_RGB_Alone(index:number,value:enWS2812_State,color:enColor_WS2812): void {
        let buf = pins.createBuffer(4);
        buf[0] = WS2812_Alone;
        buf[1] = index;
        buf[2] = value;
        buf[3] = color;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
        //basic.pause(10);//防止DMA太快,并没有出现
    }


    //% block="k210_init_SerialPort"
    //% color="#006400"
    export function k210_init_SerialPort () 
    {
        serial.redirect(
        SerialPin.P13,
        SerialPin.P14,
        BaudRate.BaudRate115200
        )
    }


    //% blockId=Ultrasonic_Car block="ultrasonic return distance(cm)"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {

        let list:Array<number> = [0, 0, 0, 0, 0];
            for (let i = 0; i < 5; i++)
            {
                pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
                pins.digitalWritePin(DigitalPin.P15, 0);
                control.waitMicros(2);
                pins.digitalWritePin(DigitalPin.P15, 1);
                control.waitMicros(15);
                pins.digitalWritePin(DigitalPin.P15, 0);
                let d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 43200);
                list[i] = Math.floor(d / 40);
            }
            list.sort();
            let length = (list[1] + list[2] + list[3])/3;
            return  Math.floor(length);
    }
     
    //% blockId=Ultrasonic_CarV2 block="ultrasonic for V2 return distance(cm)"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_CarV2(): number {
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(4);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);

        let d = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        return  Math.floor(d / 58);

    }


    //获取红外传感器部分
    //默认都检测到黑线，即信号为0
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;
    let x4 = 0;
    let irtrack_data = 0;

    function get_irtrack():number
    {
        pins.i2cWriteNumber(Microbit_Car_ADDR,IRTRACKING,NumberFormat.UInt8LE,true);
        let data = pins.i2cReadNumber(Microbit_Car_ADDR, NumberFormat.UInt8LE, false);
        return data
    }

 
    //% blockId=Deal_irtrack_data block="Deal_irtrack_data(Patrol must be called)"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Deal_irtrack_data():void
    {
        irtrack_data = get_irtrack()
        x1 = (irtrack_data & 8)>>3 
        x2 = (irtrack_data & 4)>>2
        x3 = (irtrack_data & 2)>>1 
        x4 = (irtrack_data & 1)>>0
    }

    //% blockId=Track_Line block="Track_Line|POS %pos|check %value"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Track_Line(pos:enIRtrack_Position,value:enIRtrack_State):boolean
    {
        switch(pos)
        {
            case enIRtrack_Position.LeftMost :
                if(x1 == value)
                    return true
                else return false

            case enIRtrack_Position.Left :
                if(x2 == value)
                    return true
                else return false

            case enIRtrack_Position.Right :
                if(x3 == value)
                    return true
                else return false

            case enIRtrack_Position.RightMost :
                if(x4 == value)
                    return true
                else return false
        }


    }

    



}