$(function() {
    console.log('ready');
    console.log(window.location.href);
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    console.log(vars)

    if(vars.guild == undefined){
        window.opener.location.href="/dashboard/";
    }else{
        window.opener.location.href="/dashboard/" + vars.guild;
    }
    self.close();
});