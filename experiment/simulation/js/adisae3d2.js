/**
 This Scrtpt file is developed by
Aditya Kameswara Rao Nandula
Senior Project Scientist,
Virtual Labs IIT Kharagpur.
LinkedIn: https://in.linkedin.com/in/akraonandula/
**/

import * as THREE from 'three' ;
import { STLLoader } from './threejs/jsm/loaders/STLLoader.js';
import {OrbitControls} from './threejs/jsm/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

//let adiwid=0, adihgt=0;


function adia3d(a){
    
    if(a==0){
        $("#dco").hide();
        $("#grph").hide();
    }
    else if(a==1){
        $("#dco").show();
    const mn=0.0001;
    const mx=100;
    var wndt, ptubme;
    const sizs={
        wd:window.innerWidth*0.5,
        ht:window.innerHeight*0.5
    };
    let l=(sizs.wd / sizs.ht /1000).toFixed(4);
    let b=(sizs.wd / sizs.ht /1000).toFixed(4);
    let h=(sizs.wd / sizs.ht /1000).toFixed(4);
    window.addEventListener("resize",()=>{
        rndr.setSize(sizs.wd, sizs.ht, mn, mx);
        $("#adi3d").animate({
            width:sizs.wd,
            height:sizs.ht
        },1);
        window.location.reload();
    });
    const stldr = new STLLoader();
    const scn=new THREE.Scene();
    const lgt=new THREE.PointLight(0xffffff, mn, mx);
    lgt.position.set(20, 20, 20);
    const cam=new THREE.PerspectiveCamera(45, sizs.wd / sizs.ht, mn, mx);
    cam.position.set(0.2,0.1,0.5);
    scn.add(cam);            
    scn.add(lgt);
    
    const cnvs= document.querySelector("#adi3d");
    const rndr=new THREE.WebGLRenderer({canvas:cnvs});
    
    rndr.setSize(sizs.wd, sizs.ht, mn, mx);
    rndr.render(scn,cam);
    
   /*  
    const axesHelper = new THREE.AxesHelper( 5 );
    scn.add( axesHelper ); */
    
    
    
    stldr.load( './images/cylinder.stl', function ( act ) {
        const actma = new THREE.MeshMatcapMaterial( );
        ptubme = new THREE.Mesh( act, actma );
        scn.add( ptubme );
        ptubme.position.set( -sizs.wd / sizs.ht*0, sizs.wd / sizs.ht*0, -sizs.wd / sizs.ht*0.006 );
        ptubme.rotation.set( Math.PI/2*0, 0, 0 );
        ptubme.scale.set(l*3, b*3, h*3 );
        ptubme.castShadow = true;
        ptubme.receiveShadow = true;
    
    }, undefined, function ( error ) {
    
        //console.error( error );
    
    } );
    

    stldr.load( './images/wndt.stl', function ( act ) {
    const actma = new THREE.MeshMatcapMaterial( {color: 0x346FE5});
        wndt = new THREE.Mesh( act, actma );
        scn.add( wndt );
        wndt.position.set( sizs.wd / sizs.ht*2.33, -sizs.wd / sizs.ht*0.125, -sizs.wd / sizs.ht*0.32 );
        wndt.rotation.set( -Math.PI/2*0, -Math.PI/2, -Math.PI/8 );
        wndt.scale.set(l*0.2, b*0.2, h*0.2 );
        wndt.castShadow = true;
        wndt.receiveShadow = true;
    
    }, undefined, function ( error ) {
    
        //console.error( error );
    
    } );


    const ctr = new OrbitControls(cam, cnvs);
    
    let i=0,j=0, n=500, k=sizs.wd / sizs.ht*0.0011, m=sizs.wd / sizs.ht*0.0019, adi=0;
    
    const loop = () => {
        
        rndr.render(scn,cam);
        window.requestAnimationFrame(loop);
        if(j<n){
            j=j+1;
            cam.position.set(0.15*n/j,0.05*n/j,0.12*n/j);
        }
     else{    
        
        if(i<= 20){
            //cam.position.set(0.2,0.1,0.5);
            ptubme.rotation.set( Math.PI/2*0, 0,-Math.PI/10*i );
            
        i+=0.11;
    
        rndr.render(scn,cam);
        console.clear();
        }
        else{
            if(adi==0){
                $("#grph").show();
                Aditya('./js/re.csv');
                adi=1;
            }
    }}
            };
    loop();}
    };
    
    
function Aditya(fil){
    
        Plotly.d3.csv(fil, function(dat){ 
            var t1 = [], ob1 = [], t2 = [], ob2 = [];
            for (var i=0; i<dat.length; i++) {
                let row = dat[i];
                t1[i]=Number(row['T1']);
                ob1[i]=row['Ob1'];
                t2[i]=Number(row['T2']);
                ob2[i]=row['Ob2'];
              }
        var g1 = {
            x: t1,
            y: ob1,
            mode: 'markers',
            type: 'scatter',
            name: 'Experimental'
            };
        var g2 = {
                x: t2,
                y: ob2,
                mode: 'markers',
                type: 'scatter',
                name: 'Reference'
                };
        var data = [g1,g2];
        grp(data);
        
    });
    };
    
function grp(gda){
       let gr = document.getElementById('grph');
        var layout={title: 'Comparision of Experimental and Reference data',
        showlegend: true,
        legend: {
          x: 0.5,
          xanchor: 'center',
          yanchor: 'center'
        },
        font: {
            family: 'Courier New, monospace',
            size: 15,
            color: 'black'
            },
        xaxis: {
            title:'&#x3B8;(<sup>o</sup>)',
            showticklabels: true,
            autotick: true,
            showgrid: true,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            zerolinecolor: '#969696',
            zerolinewidth: 1,
            linecolor: '#636363',
            linewidth: 1,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
             },
        yaxis: {
            title:'C<sub>p</sub>',
            showticklabels: true,
            autotick: true,
            showgrid: true,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            zerolinecolor: '#969696',
            zerolinewidth: 1,
            linecolor: '#636363',
            linewidth: 1,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
             }
        };
        Plotly.newPlot(gr, gda, layout);
    };
let x=0;
$(document).ready(()=>{
    if ( WebGL.isWebGLAvailable() ) {
        adia3d(0);
     
       
    } else {
    
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById( 'war' ).appendChild( warning );
    
    }
    window.adia3d = arg => {adia3d(arg);};
});