$('head').append('<script src="https://cdn.bootcss.com/jszip/3.1.3/jszip.js"></script>')
$('head').append('<script src="https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.js"></script>')
var city = [];
$("#sj-menu li").each((i, a) => {
    if (i) {
        var _id = $(a).attr('id');
        var _name = $(a).attr('name');
        var area = [];
        $(a).find('a').each((j, k) => {
            area.push({
                id: $(k).attr('id'),
                name: $(k).attr('name')
            })
        })
        city.push({
            id: _id,
            name: _name,
            area: area
        })
    }
})


var url = 'http://12366.chinatax.gov.cn/BsdtAllBLH_bsdtGetBst.do';
var zip = new JSZip();
var content = '';
city.forEach((item) => {
    item.area.forEach((a) => {
        var params = {
            sjbh: a.id,
            sfbh: item.id,
            lx: 1
        }
        
        $.post(url, params, (res) => {
            content += res
        })
    })
})

// 贴第二部份代码
zip.file('tax.json', content)
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});


// 浏览器不支持 promise
fetch('http://12366.chinatax.gov.cn/BsdtAllBLH_bsdtGetBst.do', {
    metch: 'POST',
    body: "sjbh=11000000&sfbh=11000010&lx=1"
}).then((res) => {
    res.json().then((json) => {
        console.dir(json)
    })
})