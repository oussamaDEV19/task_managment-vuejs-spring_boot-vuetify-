import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import projets from './projet'

Vue.use(Vuex)


export const projet = new Vuex.Store( {
    namespaced:true,
    state: {
  
    },
    mutations: {
       
    },
    getters:{
        
    },
    actions:{

        async envoyer(_,avancementProjet){
            try{
                console.log('succes');
                const response = await axios.post('http://localhost:8081/avancementProjet/'+avancementProjet.idProjet,avancementProjet,{headers:{'Authorization':`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hbGxsQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJleHAiOjE2MjI4OTI3ODd9.afwEcu7TFekQGFtN4VCKGzLDZQNlGac2zZozSnjqHE1TXtpSBj5AieJZB0DPwRfRIFY6ta1657hM33egvHgxIA `}});
                console.log(response);
            }
            catch(error){
                console.log('failed')
            }
            
          },
          async envoyerMessageEmployes(_,avancementProjet){
            try{
                console.log('succes');
                const response = await axios.post('http://localhost:8081/avancementProjet/'+avancementProjet.idProjet,avancementProjet,{headers:{'Authorization':`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hbGxsQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJleHAiOjE2MjI4OTI3ODd9.afwEcu7TFekQGFtN4VCKGzLDZQNlGac2zZozSnjqHE1TXtpSBj5AieJZB0DPwRfRIFY6ta1657hM33egvHgxIA `}});
                console.log(response);
            }
            catch(error){
                console.log('failed')
            }
            
          },
          async creerTache(_,tache){
            try{
                console.log('succestache');
                const response = await axios.post('http://localhost:8081/tache/'+tache.idEmploye+'/'+tache.idProjet,
                {
                    titre:tache.titre,
                    status: "Created",
                    description:tache.description,
                    date_debut:tache.date_debut,
                    date_fin:tache.date_fin,
                }
                ,{headers:{'Authorization':`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hbGxsQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJNQU5BR0VSIn1dLCJleHAiOjE2MjI4OTI3ODd9.afwEcu7TFekQGFtN4VCKGzLDZQNlGac2zZozSnjqHE1TXtpSBj5AieJZB0DPwRfRIFY6ta1657hM33egvHgxIA `}});
                console.log(response);
            }
            catch(error){
                console.log('failedTache')
            }   
          },
    }
})
