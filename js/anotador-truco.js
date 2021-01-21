(function(){

let btnIniciar = document.getElementById('btn-iniciar');
let btnMas1 = document.getElementById('btn-mas-1');
let btnMas2 = document.getElementById('btn-mas-2');
let btnMenos1 = document.getElementById('btn-menos-1');
let btnMenos2 = document.getElementById('btn-menos-2');
let btnOption = document.getElementById('btn-option');
let btnCancel = document.getElementById('cancel-option');
let btnReset = document.querySelectorAll('input[value="RESET"]');
let btnSalir = document.querySelectorAll('input[value="SALIR"]');
let pts1=0, pts2=0, modo=15, team1, team2;

btnIniciar.addEventListener('click', iniciar);
btnMas1.addEventListener('click', sumar);
btnMas2.addEventListener('click', sumar);
btnMenos1.addEventListener('click', restar);
btnMenos2.addEventListener('click', restar);
btnReset.forEach(btn=>{
	btn.addEventListener('click', iniciar);
});
btnSalir.forEach(btn=>{
	btn.addEventListener('click', salir);
});
btnOption.addEventListener('click', function(){
	document.getElementById('modalOptions').className = 'visible';
});
btnCancel.addEventListener('click', function(){
	document.getElementById('modalOptions').className = 'hidden';
});

function iniciar(){
	team1 = document.getElementById('team1').value;
	team2 = document.getElementById('team2').value;
	document.querySelector('#lado1>h2').innerHTML = team1;
	document.querySelector('#lado2>h2').innerHTML = team2;
	modo = document.formModo.modo.value;
	pts1 = pts2 = 0;
	resetCasitas();
	actualScore();
	document.getElementById('inicio').className = 'hidden';
	document.getElementById('modalOptions').className = 'hidden';
	document.getElementById('modalWinner').className = 'hidden';
	document.getElementById('anotador').className = 'visible';
}

function resetCasitas(){
	spanAll = document.querySelectorAll('.casita>span');
	spanAll.forEach((x,i)=>{
		x.className = 'off-trazo'+ ((i%5)+1);
	});
}

function sumar(){
	let team = this.id[8];
	let casita = document.querySelectorAll('#lado'+ team +'>.casita');
	if(team == 1){
		pts1++; pts = pts1;
		if(pts1 > modo){
			pts1 = modo; return;
		}
	}else{
		pts2++; pts = pts2;
		if(pts2 > modo){
			pts2 = modo; return;
		}
	}
	// Exception in 24 mode: when pts > 12, must skip to next "casita" adding 3pts
	if(modo == 24 && pts > 12) pts+=3;

	let posicion = parseInt(pts/5);
	let resto = pts%5;
	if(resto == 0){
		casita[posicion-1].children[4].className = 'trazo5';
	}else{
		casita[posicion].children[resto-1].className = 'trazo'+ resto;
	}
	actualScore();
	if((modo == 24 && pts-3 == modo) || (modo == 30 && pts == modo)) hayGanador(team);
}

function restar(){
	let team = this.id[10];
	let casita = document.querySelectorAll('#lado'+ team +'>.casita');
	if(team == 1){
		pts1--; pts = pts1;
		if(pts1 < 0){
			pts1 = 0; return;
		}
	}else{
		pts2--; pts = pts2;
		if(pts2 < 0){
			pts2 = 0; return;
		}
	}
	// Exception in 24 mode: when pts >12 add 3pts to draw corectly
	// and when pts < 13 must clear the previous "casita"
	if(modo == 24 && pts > 12) pts+=3;
	if(modo == 24 && pts == 12) {
		casita[3].children[0].className = 'off-trazo1';
		return;
	}

	let posicion = parseInt(pts/5);
	let resto = pts%5;
	if(resto == 0){
		casita[posicion].children[0].className = 'off-trazo1';
	}else{
		casita[posicion].children[resto].className = 'off-trazo'+ (resto+1);
	}
	actualScore();
}

function actualScore(){
	document.querySelector('#score1>h3').innerHTML = pts1;
	document.querySelector('#score2>h3').innerHTML = pts2;
}

function hayGanador(team){
	if(team == 1) winner = team1;
	else winner = team2;
	document.getElementById('mensaje-winner').innerHTML = 'Ha ganado el equipo "'+ winner +'"';
	document.getElementById('modalWinner').className = 'visible';
}

function salir(){
	document.getElementById('inicio').className = 'visible';
	document.getElementById('modalOptions').className = 'hidden';
	document.getElementById('modalWinner').className = 'hidden';
	document.getElementById('anotador').className = 'hidden';
}
	
}());