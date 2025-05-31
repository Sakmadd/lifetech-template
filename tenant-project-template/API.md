# API Documentation SWMS

## Base URL

```
https://smws.beetpos.com/api/v1
```

## Authentication

Semua endpoint memerlukan JWT token yang dikirim melalui header:

```
Authorization: Bearer <token>
```

## Endpoints

### Device Management

#### Create Device

```http
POST /device
```

Request Body:

```json
{
  "id": "123456789012" // 12 digit device ID
}
```

Response:

```json
{
  "code": 0,
  "message": "Device created successfully",
  "data": {
    "id": "123456789012"
  }
}
```

#### Daily Reading

```http
POST /device/daily-reading
```

Request Body:

```json
{
  "id": "123456789012",
  "packetSeq": 1,
  "data": [
    {
      "timeStamp": 1710288000, // Unix timestamp
      "port1": 100.5, // Required
      "port2": 200.3, // Optional
      "port3": 150.7, // Optional
      "port4": 300.2 // Optional
    }
  ]
}
```

Response:

```json
{
  "id": "123456789012",
  "type": "dailyReading",
  "packetSeq": 1,
  "code": 0
}
```

#### Interval Flow

```http
POST /device/interval-flow
```

Request Body:

```json
{
  "id": "123456789012",
  "packetSeq": 1,
  "data": [
    {
      "interval": 300, // Interval in seconds (300, 600, etc)
      "startTimeStamp": 1710288000, // Unix timestamp
      "port": 1, // Port number (1-4)
      "intervalConsumption": [25.5, 30.2, 28.7]
    }
  ]
}
```

Response:

```json
{
  "id": "123456789012",
  "type": "intervalFlow",
  "packetSeq": 1,
  "code": 0
}
```

#### Meter Info

```http
POST /device/meter-info
```

Request Body:

```json
{
  "id": "123456789012",
  "packetSeq": 1,
  "data": [
    {
      "imei": "123456789012345",
      "firmwareVersion": "1.0.0",
      "sn": "SN123456",
      "meterModel": "Model-X",
      "nominalBatteryCapacity": 100,
      "battPercentage": 85.5,
      "transmissionPower": 23.0,
      "rsrp": -90.0,
      "rssi": -70.0,
      "rsrq": -10.0,
      "sinr": 15.0,
      "ceMode": 1
    }
  ]
}
```

Response:

```json
{
  "id": "123456789012",
  "type": "meterInfo",
  "packetSeq": 1,
  "code": 0
}
```

#### Alarm

```http
POST /device/alarm
```

Request Body:

```json
{
  "id": "123456789012",
  "packetSeq": 1,
  "data": [
    {
      "timeStamp": 1710288000, // Unix timestamp
      "100": true, // Event code
      "value": 100 // Optional value
    }
  ]
}
```

Response:

```json
{
  "id": "123456789012",
  "type": "alarm",
  "packetSeq": 1,
  "code": 0
}
```

### Error Codes

| Code | Description |
| ---- | ----------- |
| 0    | Success     |
| 1    | Error       |

### Error Response Format

```json
{
  "code": 1,
  "error": "Error message"
}
```

### Valid Alarm Event Codes

- 100: Low Battery
- 101: High Battery
- 104: Port Error
- 109: Communication Error
- 112: Meter Error
- 114: System Error

### Notes

1. Device ID must be 12 digit numbers
2. All timestamps are in Unix timestamp format (seconds since epoch)
3. All numeric values are in float type
4. Alarm event code must be on a valid list
5. Port numbers are 1-4
6. Interval values are in seconds (e.g. 300, 600)
7. IMEI and SN must be unique
