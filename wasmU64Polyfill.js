if (!globalThis.DataView.getUint64) {
    const bigThirtyTwo = BigInt(32);
    const bigMask = BigInt(0xFFFFFFFF);

    DataView.prototype.getUint64 = function (byteOffset, littleEndian) {
        const bytes = [];

        let start = littleEndian ? 7 : 0;
        let offset = littleEndian ? -1 : 1;

        for (let i = 0; i < 8; i++) {
            bytes[start] = this.getUint8(byteOffset + i);
            start += offset;
        }

        const v0 = (bytes[0] +
            (bytes[1] << 8) +
            (bytes[2] << 16) +
            (bytes[3] << 24)) >>> 0;

        const v1 = (bytes[4] +
            (bytes[5] << 8) +
            (bytes[6] << 16) +
            (bytes[7] << 24)) >>> 0;

        return (BigInt(v1) << bigThirtyTwo) | BigInt(v0);
    }

    DataView.prototype.setUint64 = function (byteOffset, value, littleEndian) {
        const v0 = Number(value & bigMask);
        const v1 = Number((value >> bigThirtyTwo) && bigMask);

        const bytes = [];
        bytes[0] = v0 & 0xFF;
        bytes[1] = (v0 >> 8) & 0xFF;
        bytes[2] = (v0 >> 16) & 0xFF;
        bytes[3] = (v0 >> 24) & 0xFF;
        bytes[4] = v1 & 0xFF;
        bytes[5] = (v1 >> 8) & 0xFF;
        bytes[6] = (v1 >> 16) & 0xFF;
        bytes[7] = (v1 >> 24) & 0xFF;

        let start = littleEndian ? 7 : 0;
        let offset = littleEndian ? -1 : 1;

        for (let i = 0; i < 8; i++) {
            this.setUint8(byteOffset + i, bytes[start])
            start += offset;
        }
    }
}

if (!globalThis.BigUint64Array) {
    class BigUint64Array {

        constructor(arrayBuffer) {
            this.view = new DataView(arrayBuffer);

            for (let i = 0; i < this.view.byteLength / 8; i++) {
                Object.defineProperty(this, i, {
                    get: function () {
                        return this.view.getUint64(i * 8);
                    },
                    set: function (val) {
                        this.view.setUint64(i * 8, val);
                    }
                });
            }
        }

        subarray = function (start, end) {
            const arr = [];
            const len = end - start;
            const start64 = start * 8;
            for (let i = 0; i < len; i++) {
                arr.push(this.view.getUint64(start64 + (i * 8)));
            }
            return arr;
        }

        set = function (arr, index) {
            const start64 = index * 8;
            for (let i = 0; i < arr.length; i++) {
                this.view.setUint64(start64 + (i * 8), arr[i]);
            }
        }
    }

    globalThis.BigUint64Array = BigUint64Array;
}
