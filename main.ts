let nb_iot_waitTime = 500
enum oma_object {
    //% block="數字輸出"
    Digital_Output = 3201,
    //% block="模擬輸出"
    Analog_Output = 3203,
    //% block="通用傳感器"
    Generic_Sensor = 3300,
    //% block="照度"
    Illuminance = 3301,
    //% block="存在"
    Presence = 3302,
    //% block="溫度"
    Temperature = 3303,
    //% block=" 濕度"
    Humidity = 3304,
    //% block="功率測量"
    Power_Measurement = 3305,

}
enum oma_object_subid {
    //% block="General"
    Three = 5550,
    //% block="two"
    Two = 3301,
    //% block="year" 
    YEAR = 3340,
}
enum DHT11_Option {
    //% block="溫度" 
    Temperature = 0,

    //% block=" 濕度" 
    Humidity = 1,
}
/**
* CMHK blocks
*/
//% color=#27b0ba icon="\uf26c" groups='["NB-IoT", "MQTT","Serial","Sensor"]'
namespace CMHK {
    /**
     * 向 NB-IoT 模塊請求 IMSI
     */
    //% blockId="nb_check_imsi" block="請求 IMSI"
    //% group="NB-IoT"
    export function checkImsi(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+CIMI")
        basic.pause(nb_iot_waitTime)
    }

    /**
     * 向 NB-IoT 模塊請求 IMEI 
     */
    //% blockId="nb_check_imei" block="請求 IMEI"
    //% group="NB-IoT"
    export function checkImei(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+CGSN=1")
        basic.pause(nb_iot_waitTime)
    }


    /**
     * 檢查信號強度
     */
    //% blockId="nb_check_signal" block="檢查信號強度"
    //% group="NB-IoT"
    export function checkSignal(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+CSQ")
        basic.pause(nb_iot_waitTime)
    }

    /**
     * Request AT+MIPLCREATE
     */
    //% blockId="nb_miplcreate" block="註冊設備"
    //% group="NB-IoT"
    export function nb_miplcreate(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MIPLCREATE")
        basic.pause(nb_iot_waitTime)
    }

    /**
     * NB-IoT 打開連接
     * @param value describe value here, eg: 60
     */
    //% blockId="nb_open_connection" block="NB-IoT 打開連接 %value 秒"
    //% group="NB-IoT"
    export function nb_open_connection(value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MIPLOPEN=0," + value)
        basic.pause(5000)
    }

    /**
     * NB-IoT 更新連接
     * @param value describe value here, eg: 120
     */
    //% blockId="nb_update_connection" block="NB-IoT 更新連接 %value 秒"
    //% group="NB-IoT"
    export function nb_update_connection(value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MIPLUPDATE=0," + value + ", 0")
        basic.pause(nb_iot_waitTime)
    }

    /**
     * NB-IoT 關閉連接
     */
    //% blockId="nb_close_connection" block="NB-IoT 關閉連接"
    //% group="NB-IoT"
    export function nb_close_connection(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MIPLCLOSE=0")
        basic.pause(nb_iot_waitTime)
    }

    /**
     * NB-IoT 軟件重啟
     */
    //% blockId="nb_soft_reset" block="NB-IoT 軟件重啟"
    //% group="NB-IoT"
    export function nb_soft_reset(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+CMRB")
        basic.pause(5000)
    }




    /**
     * NB-IoT 添加對象
     * @param e describe parameter here
     */

    //% blockId="nb_add_obj" block="NB-IoT 添加對象 %e "
    //% group="NB-IoT"
    export function nb_add_obj(e: oma_object): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MIPLADDOBJ=0, " + e + ", 1, \"1\", 0, 0")
        basic.pause(nb_iot_waitTime)
    }


    /**
     * NB-IoT 通知對象
     * @param e describe parameter here
     * @param value describe value here, eg: 5
     */

    //% blockId="nb_notify_obj" block="NB-IoT 通知對象 %e %value"
    //% group="NB-IoT"
    export function nb_notify_obj(e: oma_object, value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MIPLNOTIFY=0,0," + e + ",0,5700,4,4," + value + ",0,0")
        basic.pause(nb_iot_waitTime)
    }





    /**
     * MQTT 設定 WiFi SSID
     * @param value describe value here, eg: "WIFI NAME"
     */

    //% blockId="mqtt_wifi_ssid" block="MQTT 設定 WiFi SSID: %value"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_wifi_ssid(value: string): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+SSID=" + value)
    }

    /**
     * MQTT 設定 WiFi 密碼
     * @param value describe value here, eg: "WIFI Password"
     */

    //% blockId="mqtt_wifi_pw" block="MQTT 設定 WiFi 密碼: %value"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_wifi_pw(value: string): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+PW=" + value)
    }

    /**
         * MQTT 設定產品ID
         * @param value describe value here, eg: "16001111"
         */

    //% blockId="mqtt_set_pid" block="MQTT 設定產品ID: %value"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_set_pid(value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+PID=" + value)
    }

    /**
         * MQTT 設定設備ID
         * @param value describe value here, eg: "161200005"
         */

    //% blockId="mqtt_set_did" block="MQTT 設定設備ID: %value"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_set_did(value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+DID=" + value)
    }

    /**
          * MQTT 設定鑒權密碼
          * @param value describe value here, eg: "device_pw"
          */

    //% blockId="mqtt_set_dpw" block="MQTT 設定鑒權密碼: %value"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_set_dpw(value: string): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+DPW=" + value)
    }

    /**
     * MQTT 檢視設備信息 
     */

    //% blockId="mqtt_check_info" block="MQTT 檢視設備信息"
    //% group="MQTT"
    export function mqtt_check_info(): void {

        mqtt_check_winfo()
        basic.pause(100)
        mqtt_check_gpid()
        basic.pause(100)
        mqtt_check_gdid()
        basic.pause(100)
        mqtt_check_gdpw()



    }
    
    /**
     * MQTT 檢視設備Wi-Fi信息 
     */
    //% blockId="mqtt_check_winfo" block="MQTT 檢視設備Wi-Fi信息"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_winfo(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+WINFO?")  
    }

    /**
     * MQTT 檢視產品ID
     */
    //% blockId="mqtt_check_gpid" block="MQTT 檢視產品ID"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_gpid(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+GPID?")
    }
    /**
 * MQTT 檢視設備ID
 */
    //% blockId="mqtt_check_gdid" block="MQTT 檢視設備ID"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_gdid(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+GDID?")
    }
    /**
 * MQTT 檢視設備鑒權密碼
 */
    //% blockId="mqtt_check_gdpw" block="MQTT 檢視設備鑒權密碼"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_gdpw(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+GDPW?")
    }



    

    /**
     * MQTT 連接WiFi 
     * @param value describe value here, eg: 5
     */

    //% blockId="mqtt_wifi_conn" block="MQTT 連接WiFi,嘗試次數 %value"
    //% group="MQTT"
    export function mqtt_wifi_conn(value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+CONN=" + value)
    }

    /**
     * MQTT 檢查WiFi連接
     */

    //% blockId="mqtt_check_wificonn" block="MQTT 檢查WiFi連接"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_wificonn(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+CONN?")
    }


    /**
     * MQTT 連接OneNET 
     * @param value describe value here, eg: 5
     */

    //% blockId="mqtt_onenet_conn" block="MQTT 連接OneNET,嘗試次數 %value"
    //% group="MQTT"
    export function mqtt_onenet_conn(value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MQTTCONN=" + value)
    }

    /**
     * MQTT 發送數據 
     * @param topic 發送的主題名稱, eg: Temperature
     * @param value 發送的數值, eg: 30.2
     */

    //% blockId="mqtt_send_data" block="MQTT 發送主題 %topic 數值為 %value"
    //% group="MQTT"
    export function mqtt_send_data(topic: string, value: number): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+SEND=" + topic + "," + value)
    }


    /**
        * MQTT 檢查接收數據 
        * 回傳由OneNeT平台下傳的訊息,如非下傳的訊息則回傳空白
        * @param data Input String, eg: "Recieve_String"
        */

    //% blockId="mqtt_check_revcdata" block="MQTT 檢查接收數據  %data"
    //% group="MQTT"
    export function mqtt_check_revcdata(data: string): string {
        if (data.includes("[R]")) {
            return data.substr(3, data.length)
        }
        return ""
    }


    /**
        * MQTT 模塊重啟 
        * 強制重新啟動MQTT模組
        */

    //% blockId="mqtt_restart" block="MQTT 模塊重啟"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_restart(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+RES" )
    }

    /**
        * MQTT 模塊版本 
        * 檢查 MQTT 模塊版本
        */

    //% blockId="mqtt_check_ver" block="檢查 MQTT 模塊版本"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_ver(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+VER?")
    }


    /**
        * MQTT 檢查上線狀態 
        */
    //% blockId="mqtt_check_mconn" block="檢查 MQTT 上線狀態"
    //% group="MQTT"
    //% advanced=true
    export function mqtt_check_mconn(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.writeLine("AT+MQTT?")
    }


    /**
           * 設定所有MQTT信息 
           * @param ssid Wi-Fi名稱, eg: "Wi-Fi_Name"
           * @param password Wi-Fi 密碼, eg: "Wi-Fi_Password"
           * @param pid 產品ID, eg: "16001111"
           * @param did 設備ID, eg: "161200005"
           * @param dpw 鑒權密碼, eg: "device_pw"
           * @param autoConnect 是否需要設定後馬上進行連接?
           */
    //% blockId="mqtt_master_setup" block="設定MQTT信息|Wi-Fi SSID $ssid|Wi-Fi 密碼 $password|產品ID $pid|設備ID $did|鑒權密碼 $dpw|自動連接 $autoConnect"
    //% autoConnect.defl=true
    //% group="MQTT"
    export function mqtt_master_setup(ssid: string, password: string, pid: number, did: number, dpw: string, autoConnect: boolean): void {
        mqtt_wifi_ssid(ssid)
        basic.pause(100)
        mqtt_wifi_pw(password)
        basic.pause(100)
        mqtt_set_pid(pid)
        basic.pause(100)
        mqtt_set_did(did)
        basic.pause(100)
        mqtt_set_dpw(dpw)
        basic.pause(100)
        if(autoConnect){
            mqtt_wifi_conn(5)
            basic.pause(500)
            mqtt_onenet_conn(5)
            basic.pause(500)
        }
    }

    /**
       * OneNET 通訊起始設定
       * 接收的緩衝空間預設為128,若更多或會使Micro:bit運作不正常
       * 以及防止在每一句輸出前填寫空白符號
       */

    //% blockId="onenet_uart_begin" block="OneNET 通訊起始設定"
    //% group="Serial"
    export function onenet_uart_begin(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
        serial.setRxBufferSize(128)
        serial.setWriteLinePadding(0)
    }


    /**
       * 把串口轉接向OneNet通訊模組
       * 接收的緩衝空間預設為128,若更多或會使Micro:bit運作不正常
       * 以及防止在每一句輸出前填寫空白符號
       */

    //% blockId="onenet_uart_redirect" block="把串口轉接向OneNet通訊模組"
    //% group="Serial"
    export function onenet_uart_redirect(): void {
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate9600
        )
    }

    let dht11Humidity = 0
    let dht11Temperature = 0

    /**
     * 獲取DHT11數據
     * @param option 選擇所需的數據, eg: DHT11_Option.Temperature
     * @param option 選擇所連接的針腳, eg: DigitalPin.P14
     */
    //% blockId="sensor_dht11_get" block="獲取DHT11數據 %option| 連接針腳 %pin"
    //% color=#ff7a4b
    //% group="Sensor"
    export function sensor_dht11_get(option: DHT11_Option, pin: DigitalPin): number {
        const DHT11_TIMEOUT = 100
        const buffer = pins.createBuffer(40)
        const data = [0, 0, 0, 0, 0]
        let startTime = control.micros()

        if (control.hardwareVersion().slice(0, 1) !== '1') { // V2
            // // pins.digitalReadPin(DigitalPin.P0);
            pins.digitalReadPin(DigitalPin.P1);
            pins.digitalReadPin(DigitalPin.P2);
            pins.digitalReadPin(DigitalPin.P3);
            pins.digitalReadPin(DigitalPin.P4);
            pins.digitalReadPin(DigitalPin.P10);

            // 1.start signal
            pins.digitalWritePin(pin, 0)
            basic.pause(18)

            // 2.pull up and wait 40us
            pins.setPull(pin, PinPullMode.PullUp)
            pins.digitalReadPin(pin)
            control.waitMicros(40)

            // 3.read data
            startTime = control.micros()
            while (pins.digitalReadPin(pin) === 0) {
                if (control.micros() - startTime > DHT11_TIMEOUT) break
            }
            startTime = control.micros()
            while (pins.digitalReadPin(pin) === 1) {
                if (control.micros() - startTime > DHT11_TIMEOUT) break
            }

            for (let dataBits = 0; dataBits < 40; dataBits++) {
                startTime = control.micros()
                while (pins.digitalReadPin(pin) === 1) {
                    if (control.micros() - startTime > DHT11_TIMEOUT) break
                }
                startTime = control.micros()
                while (pins.digitalReadPin(pin) === 0) {
                    if (control.micros() - startTime > DHT11_TIMEOUT) break
                }
                control.waitMicros(28)
                if (pins.digitalReadPin(pin) === 1) {
                    buffer[dataBits] = 1
                }
            }
        } else { // V1
            // 1.start signal
            pins.digitalWritePin(pin, 0)
            basic.pause(18)

            // 2.pull up and wait 40us
            pins.setPull(pin, PinPullMode.PullUp)
            pins.digitalReadPin(pin)
            control.waitMicros(40)

            // 3.read data
            if (pins.digitalReadPin(pin) === 0) {
                while (pins.digitalReadPin(pin) === 0);
                while (pins.digitalReadPin(pin) === 1);

                for (let dataBits2 = 0; dataBits2 < 40; dataBits2++) {
                    while (pins.digitalReadPin(pin) === 1);
                    while (pins.digitalReadPin(pin) === 0);
                    control.waitMicros(28)
                    if (pins.digitalReadPin(pin) === 1) {
                        buffer[dataBits2] = 1
                    }
                }
            }
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 8; j++) {
                if (buffer[8 * i + j] === 1) {
                    data[i] += 2 ** (7 - j)
                }
            }
        }

        if (((data[0] + data[1] + data[2] + data[3]) & 0xff) === data[4]) {
            dht11Humidity = data[0] + data[1] * 0.1
            dht11Temperature = data[2] + data[3] * 0.1
        }

        switch (option) {
            case DHT11_Option.Temperature:
                return dht11Temperature
            case DHT11_Option.Humidity:
                return dht11Humidity
        }
    }

    


}
