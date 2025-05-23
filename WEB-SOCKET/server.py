
# Call external libraries
import base64
import hashlib
import socket
import re
import struct
import threading
import weakref
import pymongo
from datetime import datetime

ipServer = '0.0.0.0'

# Create inner class
class Websocket(threading.Thread):
    # Create connection with MongoDb
    conex = pymongo.MongoClient(host=['127.0.0.1'], username='', password='')
    db = conex['webSocket']

    usuario = ''
    myip = ''
    myuid = 0

    # Possible actions to do over running application
    CONNECTING, OPEN, CLOSING, CLOSED = range(4)

    # Server token identification see The WebSocket Protocol
    # (rfc6455) section 1.3
    GUID_STR = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

    # Segment dataframe values
    CONTINUATION = 0x0
    TEXT = 0x1
    BINARY = 0x2
    # 0x3 - 0x7 RESERVED
    CLOSE = 0x8
    PING = 0x9
    PONG = 0xA

    # Web Socket Template
    HANDSHAKE_STR = (
        "HTTP/1.1 101 Switching Protocols\r\n"
        "Upgrade: WebSocket\r\n"
        "Connection: Upgrade\r\n"
        "Sec-WebSocket-Accept: %(acceptstr)s\r\n\r\n"
    )

    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        if 'connections' not in cls.__dict__:
            cls.connections = weakref.WeakSet()
        cls.connections.add(instance)
        return instance

    def __init__(self, conn):
        super().__init__()
        self.conn = conn
        self.state = self.CONNECTING

    def open_handshake(self):
        data = self.conn.recv(4096)
        if data:
            data = data.decode('utf-8')

        # Key transformation, using suggested by rfc6455 standard documentation
        key = re.search('Sec-WebSocket-Key: (.+)\r\n', data).group(1)
        key += self.GUID_STR
        key = hashlib.sha1(key.encode('utf-8')).digest()
        acceptstr = base64.b64encode(key).decode('utf-8')
        response = self.HANDSHAKE_STR % {'acceptstr': acceptstr}

        self.conn.sendall(response.encode('utf-8'))
        self.state = self.OPEN

        # Store data connection into mongoDB
        datos = str(self.conn).split('raddr=(')[1].replace(')>','').replace("'","").split(',')
        self.myip = datos[0]
        self.myuid = int(datos[1])
        try:
            self.db['conexiones'].insert_one({'ipaddress': self.myip,
                                              'uid': self.myuid,
                                              'user': self.usuario,
                                              'date': datetime.today(),
                                              'status': 'Conectado'})
        except Exception as e:
            print('Error al insertar datos')
            print(e)

    def close_handshake(self, status_code = 1000):
        body = struct.pack('H', status_code)
        frame = self.build_frame(body, self.CLOSE)
        self.conn.sendall(frame)

        if self.state == self.OPEN:
            self.state = self.CLOSING

            while True:
                OPCODE, PAYLOAD_DATA = self.parse_frame()
                if OPCODE == self.CLOSE:
                    break

        self.close()

    def broadcast(self, message):
        data = []
        if type(message) == str:
            opcode = self.TEXT
            data = str.split(message, ';')
            payload_data = data[0].encode('utf-8')
        elif type(message) == bytes:
            opcode = self.BINARY
            payload_data = message
        else:
            raise Exception('Mensaje no contiene texto o bytes')

        frame = self.build_frame(payload_data, opcode)

        if len(data) == 1:
            separador = data[0].split(': ')
            if separador[0] == 'Usuario':
                self.usuario = separador[1]

                # update user in mongoDB
                filtro = {'ipaddress': self.myip, 'uid': self.myuid}
                actualizacion = {'$set': {'user': self.usuario, 'date': datetime.today()}}
                self.db['conexiones'].update_one(filtro, actualizacion)

        if len(data) > 1:
            for t in self.connections:
                conex = str(t.conn).split(',')
                if (conex[-1].replace(')>', '').replace(' ', '') == data[1]) or \
                   (conex[-1].replace(')>', '').replace(' ', '') == data[2]):
                    t.conn.sendall(frame)
        else:
            for t in self.connections:
                t.conn.sendall(frame)

    def close(self):
        # Store data connection into mongoDB
        try:
            self.db['conexiones'].insert_one({'ipaddress': self.myip,
                                              'uid': self.myuid,
                                              'user': self.usuario,
                                              'date': datetime.today(),
                                              'status': 'Desconectado'})
        except Exception as e:
            print('Error al insertar datos')
            print(e)

        self.conn.shutdown(socket.SHUT_RDWR)
        self.conn.close()
        self.state = self.CLOSED

    # Unmask original data bytes, applying instructions read from
    # section 5.3 Client-to-Server Masking from rfc6455 reference
    def unmask(self, data, key):
        unmasked = bytearray(data)
        for i in range(len(data)):
            j = i % 4
            unmasked[i] = data[i] ^ key[j]
        return unmasked

    # Refers back rfc6455 documentation, section 5.2 Base Framing Protocol,
    # that try to describe each byte into the dataframe.
    def parse_frame(self):
        data = self.conn.recv(2)

        FIN = (data[0] >> 7) & 1
        RSSV1 = (data[0] >> 6) & 1
        RSSV2 = (data[0] >> 5) & 1
        RSSV3 = (data[0] >> 4) & 1

        OPCODE = data[0] & 0xf
        MASK = (data[1] >> 7) & 1

        if not MASK:
            self.close_handshake(1002)

        PAYLOAD_LENGTH = data[1] & 0x7f

        if PAYLOAD_LENGTH == 126:
            data = self.conn.recv(2)
            PAYLOAD_LENGTH = struct.unpack('B', data)[0]
        elif PAYLOAD_LENGTH == 127:
            data = self.conn.recv(8)
            PAYLOAD_LENGTH = struct.unpack('B', data)[0]

        MASKING_KEY = self.conn.recv(4)
        PAYLOAD_DATA = self.conn.recv(PAYLOAD_LENGTH)
        PAYLOAD_DATA = self.unmask(PAYLOAD_DATA, MASKING_KEY)

        return OPCODE, PAYLOAD_DATA

    # Recive and transmit data
    def data_transfer(self):
        OPCODE, PAYLOAD_DATA = self.parse_frame()
        if OPCODE == self.TEXT:
            self.onMessage(PAYLOAD_DATA.decode('utf-8'))
        elif OPCODE == self.BINARY:
            self.onMessage(PAYLOAD_DATA)
        elif OPCODE == self.CLOSE:
            self.state = self.CLOSING
            self.close_handshake()
        elif OPCODE == self.PING:
            pass
        elif OPCODE == self.PONG:
            pass
        else:
            self.close_handshake(1002)

    def run(self):
        while True:
            if self.state == self.CONNECTING:
                self.open_handshake()
                self.onConnect()
            elif self.state == self.OPEN:
                self.data_transfer()
            elif self.state == self.CLOSED:
                self.onDisconnect()
                break

    def build_frame(self, payload_data, opcode):
        header = struct.pack('!B', ((1 << 7) | (0 << 6) | (0 << 5) | (0 << 4) | opcode))
        mask_bit = 0
        length = len(payload_data)

        if length <= 125:
            header += struct.pack('!B', (mask_bit | length))
        elif length <= (2**16):
            header += struct.pack('!B', (mask_bit | 126)) + struct.pack('!H', length)
        elif length <= (2**64):
            header += struct.pack('!B', (mask_bit | 127)) + struct.pack('!Q', length)

        return header + payload_data

    def onMessage(self):
        raise NotImplementedError

    def onConnect(self):
        raise NotImplementedError

    def onDisconnect(self):
        raise NotImplementedError


class WebsocketServer:
    def __init__(self, ws_cls):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.ws_cls = ws_cls

    def run(self, puerto=5001):
        self.socket.bind((ipServer, puerto))
        self.socket.listen()

        while True:
            print('Esperando por conexiones en el puerto: {0}'.format(puerto))
            conn, addr = self.socket.accept()
            print('Conectado desde {0}'.format(addr))
            print(conn)
            ws = self.ws_cls(conn)
            ws.start()
