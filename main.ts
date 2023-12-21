//% blockId=Microbit_Car block="DIY_Car"
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
        //% blockId="RIGHT" block="RIGHT"
        RIGHT,
        //% blockId="LEFT_SPIN" block="LEFT_SPIN"
        LEFT_SPIN,
        //% blockId="RIGHT_SPIN" block="RIGHT_SPIN"
        RIGHT_SPIN
    }

    export enum enServo_ID_PWM {
        //% blockId="Servo_S1" block="Servo_S1"
        Servo_S1 = 0,
        //% blockId="Servo_S2" block="Servo_S2"
        Servo_S2,
        //% blockId="Servo_S3" block="Servo_S3"
        Servo_S3,
        //% blockId="Servo_S4" block="Servo_S4"
        Servo_S4,
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
        //% blockId="Open" block="Open"
        Open
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

    export enum Microbit_Pin_GPIO {
      //% blockId="P0" block="P0"
      P0 = 0,
      //% blockId="P1" block="P1"
      P1 = 1,
      //% blockId="P2" block="P2"
      P2 = 2,
      //% blockId="P12" block="P12"
      P12 = 3
  }

  export enum Microbit_Pin_Read_Mode {
    //% blockId="Number" block="Number"
    Number = 0,
    //% blockId="Analog" block="Analog"
    Analog = 1
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
        //范围限制
        if(Timbre>1000) Timbre =1000;
        else if(Timbre<0) Timbre = 0;

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
         //范围限制
         if(speed>1000) speed =1000;
         else if(speed<0) speed = 0;
 
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
        //范围限制
        if(speed_L>1000) speed_L =1000;
        else if(speed_L<-1000) speed_L = -1000;
        if(speed_R>1000) speed_R =1000;
        else if(speed_R<-1000) speed_R = -1000;


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

    //% blockId=Set_PWM_Servo block="Set_PWM_Servo(S1-S4)|servo %value|angle %angle"
    //% weight=98
    //% blockGap=10
    //% angle.min=0 angle.max=180 
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Set_PWM_Servo(value:enServo_ID_PWM,angle:number): void {
        //范围限制
        if(angle>180) angle = 180;
        else if(angle<0) angle = 0;

        let buf = pins.createBuffer(3);
        buf[0] = SERVO_STATE;
        buf[1] = value;
        buf[2] = angle;
        pins.i2cWriteBuffer(Microbit_Car_ADDR, buf);
    }

    //% blockId=Microbit_GPIO_OutPut block="Microbit_GPIO_OutPut|Pin %value|value %price"
    //% weight=98
    //% blockGap=10
    //% price.min=0 price.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Microbit_GPIO_OutPut(value:Microbit_Pin_GPIO,price:number): void {
      switch(value)
      {
        case Microbit_Pin_GPIO.P0:
          pins.digitalWritePin(DigitalPin.P0, price)
          break

        case Microbit_Pin_GPIO.P1:
          pins.digitalWritePin(DigitalPin.P1, price)
          break

        case Microbit_Pin_GPIO.P2:
          pins.digitalWritePin(DigitalPin.P2, price)
          break

        case Microbit_Pin_GPIO.P12:
          pins.digitalWritePin(DigitalPin.P12, price)
          break

      }

    }

    //% blockId=Microbit_GPIO_OutPut_Analog block="Microbit_GPIO_OutPut_Analog|Pin %value|value %price"
    //% weight=98
    //% blockGap=10
    //% price.min=0 price.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Microbit_GPIO_OutPut_Analog(value:Microbit_Pin_GPIO,price:number): void {
      switch(value)
      {
        case Microbit_Pin_GPIO.P0:
          pins.analogWritePin(AnalogPin.P0, price)
          break

        case Microbit_Pin_GPIO.P1:
          pins.analogWritePin(AnalogPin.P1, price)
          break

        case Microbit_Pin_GPIO.P2:
          pins.analogWritePin(AnalogPin.P2, price)
          break

        case Microbit_Pin_GPIO.P12:
          pins.analogWritePin(AnalogPin.P12, price)
          break

      }

    }

    //% blockId=Microbit_GPIO_InPut block="Microbit_GPIO_InPut|Pin %value|Read_Mode %mode"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Microbit_GPIO_InPut(value:Microbit_Pin_GPIO,mode:Microbit_Pin_Read_Mode): number {
      if(mode == Microbit_Pin_Read_Mode.Number)
      {
        switch(value)
        {
          case Microbit_Pin_GPIO.P0:
            return pins.digitalReadPin(DigitalPin.P0)
            

          case Microbit_Pin_GPIO.P1:
            return pins.digitalReadPin(DigitalPin.P1)
            

          case Microbit_Pin_GPIO.P2:
            return pins.digitalReadPin(DigitalPin.P2)
          
          case Microbit_Pin_GPIO.P12:
            return pins.digitalReadPin(DigitalPin.P12)

        }
      }
      else if(mode == Microbit_Pin_Read_Mode.Analog)
      {
        switch(value)
        {
          case Microbit_Pin_GPIO.P0:
            return pins.analogReadPin(AnalogPin.P0)
            

          case Microbit_Pin_GPIO.P1:
            return pins.analogReadPin(AnalogPin.P1)
            

          case Microbit_Pin_GPIO.P2:
            return pins.analogReadPin(AnalogPin.P2)
          
          case Microbit_Pin_GPIO.P12:
            return pins.analogReadPin(AnalogPin.P12)

        }
      }
      return 0

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
         //范围限制
         if(index>3) index = 3;
         else if(index<0) index = 0;

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


// MakerBit blocks supporting a Keyestudio Infrared Wireless Module Kit
// (receiver module+remote controller)

const enum IrButton {
	//% block="any"
	Any = -1,
	Power = 0x0,
	Up = 128,
	Left = 32,
	Right = 96,
	Down = 144,
	Light = 64,
	BEEP = 160,
	Plus = 48,
	Minus = 112, 
	TLeft = 16,
	TRight = 80,
	NUM0 = 176,
	NUM1 = 8,
	NUM2 = 136,
	NUM3 = 72,
	NUM4 = 40,
	NUM5 = 168,
	NUM6 = 104,
	NUM7 = 24,
	NUM8 = 152,
	NUM9 = 88
}

const enum IrButtonAction {
  //% block="pressed"
  Pressed = 0,
  //% block="released"
  Released = 1,
}

const enum IrProtocol {
  //% block="Keyestudio"
  Keyestudio = 0,
  //% block="NEC"
  NEC = 1,
}

//% weight=10 color=#008B00 icon="\uf1eb" block="DIYCar_IR_V2"
namespace makerbit {
  let irState: IrState;

  const IR_REPEAT = 256;
  const IR_INCOMPLETE = 257;
  const IR_DATAGRAM = 258;

  const REPEAT_TIMEOUT_MS = 120;

  interface IrState {
    protocol: IrProtocol;
    hasNewDatagram: boolean;
    bitsReceived: uint8;
    addressSectionBits: uint16;
    commandSectionBits: uint16;
    hiword: uint16;
    loword: uint16;
    activeCommand: number;
    repeatTimeout: number;
    onIrButtonPressed: IrButtonHandler[];
    onIrButtonReleased: IrButtonHandler[];
    onIrDatagram: () => void;
  }
  class IrButtonHandler {
    irButton: IrButton;
    onEvent: () => void;

    constructor(
      irButton: IrButton,
      onEvent: () => void
    ) {
      this.irButton = irButton;
      this.onEvent = onEvent;
    }
  }


  function appendBitToDatagram(bit: number): number {
    irState.bitsReceived += 1;

    if (irState.bitsReceived <= 8) {
      irState.hiword = (irState.hiword << 1) + bit;
      if (irState.protocol === IrProtocol.Keyestudio && bit === 1) {
        // recover from missing message bits at the beginning
        // Keyestudio address is 0 and thus missing bits can be detected
        // by checking for the first inverse address bit (which is a 1)
        irState.bitsReceived = 9;
        irState.hiword = 1;
      }
    } else if (irState.bitsReceived <= 16) {
      irState.hiword = (irState.hiword << 1) + bit;
    } else if (irState.bitsReceived <= 32) {
      irState.loword = (irState.loword << 1) + bit;
    }

    if (irState.bitsReceived === 32) {
      irState.addressSectionBits = irState.hiword & 0xffff;
      irState.commandSectionBits = irState.loword & 0xffff;
      return IR_DATAGRAM;
    } else {
      return IR_INCOMPLETE;
    }
  }

  function decode(markAndSpace: number): number {
    if (markAndSpace < 1600) {
      // low bit
      return appendBitToDatagram(0);
    } else if (markAndSpace < 2700) {
      // high bit
      return appendBitToDatagram(1);
    }

    irState.bitsReceived = 0;

    if (markAndSpace < 12500) {
      // Repeat detected
      return IR_REPEAT;
    } else if (markAndSpace < 14500) {
      // Start detected
      return IR_INCOMPLETE;
    } else {
      return IR_INCOMPLETE;
    }
  }

  function enableIrMarkSpaceDetection(pin: DigitalPin) {
    pins.setPull(pin, PinPullMode.PullNone);

    let mark = 0;
    let space = 0;

    pins.onPulsed(pin, PulseValue.Low, () => {
      // HIGH, see https://github.com/microsoft/pxt-microbit/issues/1416
      mark = pins.pulseDuration();
    });

    pins.onPulsed(pin, PulseValue.High, () => {
      // LOW
      space = pins.pulseDuration();
      const status = decode(mark + space);

      if (status !== IR_INCOMPLETE) {
        handleIrEvent(status);
      }
    });
  }

  function handleIrEvent(irEvent: number) {

    // Refresh repeat timer
    if (irEvent === IR_DATAGRAM || irEvent === IR_REPEAT) {
      irState.repeatTimeout = input.runningTime() + REPEAT_TIMEOUT_MS;
    }

    if (irEvent === IR_DATAGRAM) {
      irState.hasNewDatagram = true;

      if (irState.onIrDatagram) {
        background.schedule(irState.onIrDatagram, background.Thread.UserCallback, background.Mode.Once, 0);
      }

      const newCommand = irState.commandSectionBits >> 8;

      // Process a new command
      if (newCommand !== irState.activeCommand) {

        if (irState.activeCommand >= 0) {
          const releasedHandler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IrButton.Any === h.irButton);
          if (releasedHandler) {
            background.schedule(releasedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
          }
        }

        const pressedHandler = irState.onIrButtonPressed.find(h => h.irButton === newCommand || IrButton.Any === h.irButton);
        if (pressedHandler) {
          background.schedule(pressedHandler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
        }

        irState.activeCommand = newCommand;
      }
    }
  }

  function initIrState() {
    if (irState) {
      return;
    }

    irState = {
      protocol: undefined,
      bitsReceived: 0,
      hasNewDatagram: false,
      addressSectionBits: 0,
      commandSectionBits: 0,
      hiword: 0, // TODO replace with uint32
      loword: 0,
      activeCommand: -1,
      repeatTimeout: 0,
      onIrButtonPressed: [],
      onIrButtonReleased: [],
      onIrDatagram: undefined,
    };
  }

  //% blockId="makerbit_infrared_connect_receiver"
  //% block="connect IR receiver at pin %pin"
  //% pin.fieldEditor="gridpicker"
  //% pin.fieldOptions.tooltips="false"
  //% weight=90
  export function connectIrReceiver(
    pin: DigitalPin
  ): void {
    initIrState();

    irState.protocol = IrProtocol.NEC;

    enableIrMarkSpaceDetection(pin);

    background.schedule(notifyIrEvents, background.Thread.Priority, background.Mode.Repeat, REPEAT_TIMEOUT_MS);
  }

  function notifyIrEvents() {
    if (irState.activeCommand === -1) {
      // skip to save CPU cylces
    } else {
      const now = input.runningTime();
      if (now > irState.repeatTimeout) {
        // repeat timed out

        const handler = irState.onIrButtonReleased.find(h => h.irButton === irState.activeCommand || IrButton.Any === h.irButton);
        if (handler) {
          background.schedule(handler.onEvent, background.Thread.UserCallback, background.Mode.Once, 0);
        }

        irState.bitsReceived = 0;
        irState.activeCommand = -1;
      }
    }
  }

  //% blockId=makerbit_infrared_on_ir_button
  //% block="on IR button | %button | %action"
  //% button.fieldEditor="gridpicker"
  //% button.fieldOptions.tooltips="false"
  //% weight=50
  export function onIrButton(
    button: IrButton,
    action: IrButtonAction,
    handler: () => void
  ) {
    initIrState();
    if (action === IrButtonAction.Pressed) {
      irState.onIrButtonPressed.push(new IrButtonHandler(button, handler));
    }
    else {
      irState.onIrButtonReleased.push(new IrButtonHandler(button, handler));
    }
  }

  /**
   * Returns the code of the IR button that was pressed last. Returns -1 (IrButton.Any) if no button has been pressed yet.
  //% blockId=makerbit_infrared_ir_button_pressed
  //% block="IR button"
  //% weight=70
  export function irButton(): number {
    basic.pause(0); // Yield to support background processing when called in tight loops
    if (!irState) {
      return IrButton.Any;
    }
    return irState.commandSectionBits >> 8;
  }
   */

  /**
   * Do something when an IR datagram is received.
   * @param handler body code to run when the event is raised
  //% blockId=makerbit_infrared_on_ir_datagram
  //% block="on IR datagram received"
  //% weight=40
  export function onIrDatagram(handler: () => void) {
    initIrState();
    irState.onIrDatagram = handler;
  }
   */

  /**
   * Returns the IR datagram as 32-bit hexadecimal string.
   * The last received datagram is returned or "0x00000000" if no data has been received yet.
  //% blockId=makerbit_infrared_ir_datagram
  //% block="IR datagram"
  //% weight=30
  export function irDatagram(): string {
    basic.pause(0); // Yield to support background processing when called in tight loops
    initIrState();
    return (
      "0x" +
      ir_rec_to16BitHex(irState.addressSectionBits) +
      ir_rec_to16BitHex(irState.commandSectionBits)
    );
  }
   */

  /**
   * Returns true if any IR data was received since the last call of this function. False otherwise.
  //% blockId=makerbit_infrared_was_any_ir_datagram_received
  //% block="IR data was received"
  //% weight=80
  export function wasIrDataReceived(): boolean {
    basic.pause(0); // Yield to support background processing when called in tight loops
    initIrState();
    if (irState.hasNewDatagram) {
      irState.hasNewDatagram = false;
      return true;
    } else {
      return false;
    }
  }
   */

  /**
   * Returns the command code of a specific IR button.
   * @param button the button
  //% blockId=makerbit_infrared_button_code
  //% button.fieldEditor="gridpicker"
  //% button.fieldOptions.columns=3
  //% button.fieldOptions.tooltips="false"
  //% block="IR button code %button"
  //% weight=60
  export function irButtonCode(button: IrButton): number {
    basic.pause(0); // Yield to support background processing when called in tight loops
    return button as number;
  }

  function ir_rec_to16BitHex(value: number): string {
    let hex = "";
    for (let pos = 0; pos < 4; pos++) {
      let remainder = value % 16;
      if (remainder < 10) {
        hex = remainder.toString() + hex;
      } else {
        hex = String.fromCharCode(55 + remainder) + hex;
      }
      value = Math.idiv(value, 16);
    }
    return hex;
  }
   */
}

namespace makerbit {
    export namespace background {

        export enum Thread {
            Priority = 0,
            UserCallback = 1,
        }

        export enum Mode {
            Repeat,
            Once,
        }

        class Executor {
            _newJobs: Job[] = undefined;
            _jobsToRemove: number[] = undefined;
            _pause: number = 100;
            _type: Thread;

            constructor(type: Thread) {
                this._type = type;
                this._newJobs = [];
                this._jobsToRemove = [];
                control.runInParallel(() => this.loop());
            }

            push(task: () => void, delay: number, mode: Mode): number {
                if (delay > 0 && delay < this._pause && mode === Mode.Repeat) {
                    this._pause = Math.floor(delay);
                }
                const job = new Job(task, delay, mode);
                this._newJobs.push(job);
                return job.id;
            }

            cancel(jobId: number) {
                this._jobsToRemove.push(jobId);
            }

            loop(): void {
                const _jobs: Job[] = [];

                let previous = control.millis();

                while (true) {
                    const now = control.millis();
                    const delta = now - previous;
                    previous = now;

                    // Add new jobs
                    this._newJobs.forEach(function (job: Job, index: number) {
                        _jobs.push(job);
                    });
                    this._newJobs = [];

                    // Cancel jobs
                    this._jobsToRemove.forEach(function (jobId: number, index: number) {
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            const job = _jobs[i];
                            if (job.id == jobId) {
                                _jobs.removeAt(i);
                                break;
                            }
                        }
                    });
                    this._jobsToRemove = []


                    // Execute all jobs
                    if (this._type === Thread.Priority) {
                        // newest first
                        for (let i = _jobs.length - 1; i >= 0; i--) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    } else {
                        // Execute in order of schedule
                        for (let i = 0; i < _jobs.length; i++) {
                            if (_jobs[i].run(delta)) {
                                this._jobsToRemove.push(_jobs[i].id)
                            }
                        }
                    }

                    basic.pause(this._pause);
                }
            }
        }

        class Job {
            id: number;
            func: () => void;
            delay: number;
            remaining: number;
            mode: Mode;

            constructor(func: () => void, delay: number, mode: Mode) {
                this.id = randint(0, 2147483647)
                this.func = func;
                this.delay = delay;
                this.remaining = delay;
                this.mode = mode;
            }

            run(delta: number): boolean {
                if (delta <= 0) {
                    return false;
                }
                
                this.remaining -= delta;
                if (this.remaining > 0) {
                    return false;
                }

                switch (this.mode) {
                    case Mode.Once:
                        this.func();
                        basic.pause(0);
                        return true;
                    case Mode.Repeat:
                        this.func();
                        this.remaining = this.delay;
                        basic.pause(0);
                        return false;
                }
            }
        }

        const queues: Executor[] = [];

        export function schedule(
            func: () => void,
            type: Thread,
            mode: Mode,
            delay: number,
        ): number {
            if (!func || delay < 0) return 0;

            if (!queues[type]) {
                queues[type] = new Executor(type);
            }

            return queues[type].push(func, delay, mode);
        }

        export function remove(type: Thread, jobId: number): void {
            if (queues[type]) {
                queues[type].cancel(jobId);
            }
        }
    }
}
