var utl = {
    timeFormat:function(time,fomal){
        var t = new Date(parseInt(time,10));
        var year = t.getFullYear();
        var month = t.getMonth()+1 < 10 ? '0' + (t.getMonth()+1) : t.getMonth()+1;
        var day = t.getUTCDate() < 10 ? '0' + t.getUTCDate() : t.getUTCDate();
        var h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
        var m = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
        var i = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();

        fomal = fomal.replace(/[yY]+/g,year);
        fomal = fomal.replace(/[mM]+/g,month);
        fomal = fomal.replace(/[dD]+/g,day);
        fomal = fomal.replace(/[hH]+/g,h);
        fomal = fomal.replace(/[sS]+/g,m);
        fomal = fomal.replace(/[iI]+/g,i);
        return fomal;
    }
}

export default utl;