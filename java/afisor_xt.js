class afisor_xt
{
	constructor(c,pozx, pozy, n_maxx, n_maxy, val_max, val_min, x_max, x_min)
	{
		this.cnvs=c; // canvas
		this.x0 = pozx;// pozitia pe x
		this.y0 = pozy;// pozitia pe y
		this.w = n_maxx; // latimea
		this.h = n_maxy;// inaltimea
		this.v_max = val_max; // valoarea maxima
		this.v_min = val_min // valoarea minima
		this.x_mx = x_max; // x maxim
		this.x_mn = 0 // x minim
	}
	auto_sx(x_maxim, x_minim)
	{
		if (x_maxim - x_minim != 0)
		{
			this.x_mx = x_maxim;
			this.x_mn = x_minim;
		}
		else
		{
			this.x_mx = this.w;
			thisx_mn = 0;
		}
	}
	deseneaza()  {
	
	var i,j,ps,v_g,fs;
	
	// sterg continut
	
	this.cnvs.beginPath();
	this.cnvs.fillStyle = "Azure";
	this.cnvs.fillRect(this.x0-30,this.y0-10,this.w+40,this.h+30);
	this.cnvs.stroke();	
	
	//chenar
	
	this.cnvs.beginPath();
	this.cnvs.moveTo(this.x0,this.y0); 
	this.cnvs.strokeStyle = "rgb(0,0,255)";
	this.cnvs.lineTo(this.x0+this.w,this.y0);
	this.cnvs.lineTo(this.x0+this.w,this.y0+this.h);
	this.cnvs.lineTo(this.x0,this.y0+this.h);
	this.cnvs.lineTo(this.x0,this.y0);
	this.cnvs.stroke();

	// grid orizontal minor
			
	this.cnvs.beginPath();
	this.cnvs.strokeStyle = "rgb(200,200,200)";
	this.cnvs.font = "10px Arial";
	for (j = this.h-10; j >=0; j -= 10)
	{
		this.cnvs.moveTo(this.x0,this.y0+j); 
		this.cnvs.lineTo(this.x0 + this.w, this.y0 + j);
	}
	
	// grid vertical minor
	
	for (j = 10; j<=this.w-10; j += 10)
	{
		this.cnvs.moveTo(this.x0+j,this.y0+1); 
		this.cnvs.lineTo(this.x0 + j ,this.y0+ this.h+1);
	}
	this.cnvs.stroke();

	// grid vertical major
			
	this.cnvs.beginPath();
   	this.cnvs.strokeStyle = "rgb(150,150,150)";
	ps=(this.v_max-this.v_min)/this.h*50;
	v_g=this.v_min;
    	for (j = this.h; j >=0; j -= 50)
    	{
		this.cnvs.moveTo(this.x0,this.y0+j); 
		this.cnvs.lineTo(this.x0 + this.w ,this.y0 + j);
		this.cnvs.strokeText(v_g.toFixed(0),this.x0-20,this.y0 + j);
		v_g=v_g+ps;
    	}

	// grid orizontal major

	ps=(this.x_mx-this.x_mn)/this.w*50;
	v_g=this.x_mn;
	for (j = 0; j<this.w; j += 50)
	{
		this.cnvs.moveTo(this.x0+j,this.y0); 
		this.cnvs.lineTo(this.x0 + j ,this.y0+ this.h-1);	
		this.cnvs.strokeText(v_g.toFixed(2),this.x0 + j,this.y0 + this.h+10);
		v_g=v_g+ps;
	}
	this.cnvs.moveTo(this.x0+j,this.y0); 
	this.cnvs.stroke();
	}

	set_val(vls, nv,r,g,b)  {
		var val_v, val ,i ,j,fs,transl;			
		fs= this.h / (this.v_max-this.v_min); // factorul de scala
		transl=fs*(0-this.v_min); // translatia
		val_v = transl+fs*vls[0];

		// trasez graficul

		this.cnvs.beginPath();
		this.cnvs.strokeStyle = "rgb("+r+","+g+","+b+")";
		this.cnvs.moveTo(this.x0,this.y0+this.h-val_v); 
	 	for (i = 0; i<=nrv; i +=1){
			val = transl+fs*vls[i]; //scalare
			this.cnvs.lineTo(this.x0 + i ,this.y0+ this.h-val);
	 	}
		this.cnvs.stroke();
	}	
}

var fel=1;
        var fr;
        var ctx7=desen07.getContext("2d");
        ctx7.lineWidth = .5; 
        w=desen07.width ;
        h=desen07.height/2-20;
        vals = [];
        nrv=300;
        ht=250;
        vmax=4;
        vmin=-4;
        xmax=1.5;
        xmin=-1.5;
        for(i=0;i<nrv;i++){
            vals[i]=Math.round(ht/2);
        }
        function set_fr(){
        fr = document.getElementById('fr_id').value;
        fr_t.innerHTML=fr;
        }
        function val_rd(rd1) {
            fel= rd1;
        }
        function graf() {
            x=xmin;
            pas=(xmax-xmin)/nrv;
            for(i=0;i<nrv;i++){
                vals[i]=(1-Math.pow(Math.E,x))*Math.sin(fr*x);
                x+=pas;
            }
            osci.deseneaza();
            osci.auto_sx(xmax,xmin);
            osci.set_val(vals,nrv,255,0,0);
            set_fr();
            setTimeout("graf()",100);
        }
        osci = new afisor_xt(ctx7,25,10,nrv,ht,vmax,vmin,xmax,xmin);
        graf();