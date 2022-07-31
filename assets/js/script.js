$(document).ready(function(){
     $("form").submit(function(evento){
         evento.preventDefault();
 
         let valueInput= $("#heroeInput").val();
         
 
        let expreg = /^([0-9])*$/gim;
        if(valueInput.match(expreg)){
            
        }else{
            alert("Sólo se puede ingresar números")
        }
        
        if(valueInput>732){
            alert("Id máximo 732")
        }
     $.ajax({
         url:"https://superheroapi.com/api.php/2434431213368205/" + valueInput,
         success: function(data){
             
             let nombre = data.name;
             let conexiones1 = data.connections["group-affiliation"];
            
             let imagen = data.image.url;
             let ocupacion = data.work.occupation;
             let primeraAparicion = data.biography["first-appearance"];
             let altura = data.appearance.height.join(" - ");
             let peso = data.appearance.weight.join(" - ");
             let alianzas = data.biography.aliases.join(" ");
             let alterEgos = data.biography.publisher;
             let poderes = data.powerstats;
                                 
            
 
             $("#heroeInfo").html(`
             <div class="text-justify">
                <h6>Nombre: ${nombre}  </h6>
                 <p>Primera aparición: ${primeraAparicion}</p>
                 <p>Altura: ${altura}</p>
                 <p>Conexiones: ${conexiones1}</p>
                 <p>Ocupación: ${ocupacion}</p>                        
                 <p>Alianzas: ${alianzas}</p>
                 <p>Peso: ${peso}</p>
                 <p>Publicado por: ${alterEgos}</p>
             </div>            
             `);

             $("#heroefoto").html(`
             <img src="${imagen}" alt="" width="auto" height="300px"/>
             `)
             
             let estadisticas=[] 
 
             Object.keys(data.powerstats).forEach(function (s,index) {     
                if(Object.values(data.powerstats)[index] !="null"){               
                 estadisticas.push({
                     y: Object.values(data.powerstats)[index],  
                     label: s,
                 },
                    )}
             })
             console.log(estadisticas)
             

             function vacio(arr){
                let cont = 0
                   for(i=0; i< arr.length; i++){
                       cont++
                  }
                  return cont
            }
            if (vacio(estadisticas)==0){
               $("#heroeStats").html(`<h4 id="sinEstadisticas" >No cuenta con estadísticas</h4>`)
            }else{             



             let config={
                 animationEnabled: true,
                 title: {
                     text:`Estadísticas de Poder para ${nombre}`
                  },
                 
                 data: [
                     {
                         type: "pie",
                         startAngle: 25,
                         toolTipContent: "<b>{label}</b>: {y}",
                         showInLegend: "true",
                         legendText: "{label}",
                         indexLabelFontSize: 14,
                         indexLabel: "{label} - ({y})",                                     
                         dataPoints: estadisticas
                     }
                 ]
         };
 
         let chart = new CanvasJS.Chart("heroeStats", config);
 
         chart.render()
     }}
 })
 
 })
 
 
 
 
 
 
         
 
 })
 
 
 
 
 
 