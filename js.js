const output = document.getElementById('output');
const encode = document.getElementById('encode');
const decode = document.getElementById('decode');
const base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

// index를 base64 문자로 변환하는 함수
function en(index) {
    return base64Table[index]
}

// base64 문자를 index로 변환하는 함수
function de(decodedChar) {
    return base64Table.indexOf(decodedChar)
}

encode.addEventListener('click', () => {

    let input = document.getElementById("input").value;
    let count = input.length % 3;
    let binary = '';
    output.value = '';

    // input을 binary에 2진수 변환
    for(const char of input) {
        const ascii = char.charCodeAt(0);
        const bit8 = ascii.toString(2).padStart(8, '0');
        binary += bit8;
    }

    // binary를 base64 변환
    for(let i = 0; i < binary.length; i += 6) {
        const bit6 = binary.substring(i, i + 6).padEnd(6, '0');
        const index = parseInt(bit6, 2);
        output.value += en(index);
    }

    if(count === 2) {
        output.value += '=';
    } else if(count === 1) {
        output.value += '==';
    }
})

decode.addEventListener('click', () => {

    let input = document.getElementById('input').value;
    let binary = '';
    output.value = '';

    input = input.replace(/=/g, '');

    for(const char of input) {
        const index = de(char);
        const bit6 = index.toString(2).padStart(6, '0');
        binary += bit6;
    }

    // 비트가 8개 이상일 때만 처리
    for(let i = 0; i + 8 < binary.length; i += 8) {
        const bit8 = binary.substring(i, i + 8);
        const asciiCode = parseInt(bit8, 2);
        const char = String.fromCharCode(asciiCode);
        output.value += char;
    }
})