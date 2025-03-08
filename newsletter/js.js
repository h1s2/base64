function encode() {
    var a = document.getElementById("input").value
    var b = document.getElementById("output")
    var count = 0
    var twe = ""
    var total = ""


    //twe로 2진수 변환
    while(1) {
        if(a == "") break

        twe += a.charCodeAt(0).toString(2).padStart(8, '0')
        a = a.substr(1)
        count++
        
        if(count == 3) count = 0
    }

    //total로 base64 변환
    while(1) {
        if(twe == "") break

        total += en(parseInt(twe.substring(0, 6).padEnd(6, '0'), 2))
        twe = twe.substring(6)
    }

    if(count == 2) total += "="
    else if(count == 1) total += "=="

    
    b.value = total
}

function decode() {
    var a = document.getElementById("input").value
    var b = document.getElementById("output")
    var twe = ""
    var total = ""


    a = a.replace(/=/g, '')

    while(1) {
        if(a == "") break
        twe += de(a.substring(0, 1)).toString(2).padStart(6, '0')
        a = a.substring(1)
    }

    while(1) {
        if(twe.indexOf('1') == -1) break
        total += String.fromCharCode(parseInt(twe.substring(0, 8), 2))
        twe = twe.substring(8)
    }

    b.value = total
}

function en(tt) {
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

    return code.substring(tt, tt + 1)
}

function de(tt) {
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    return code.indexOf(tt)
}