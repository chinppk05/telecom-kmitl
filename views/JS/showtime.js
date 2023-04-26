function display_ct() {
    var x = new Date()
    var x2= x.getDate()+ "/" + (x.getMonth() + 1)+ "/" + x.getFullYear(); 
    x1 = x.getHours( )+ ":" +  x.getMinutes() + ":" +  x.getSeconds();
    document.getElementById('time-clock').innerHTML = x1;
    document.getElementById('time-date').innerHTML = x2;
    
    display_c();
    }
