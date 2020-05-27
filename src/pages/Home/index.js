import React, {useState,useEffect } from 'react';
import './style.css';
import '../../style.css';
import Container from '@material-ui/core/Container';
import Banner from '../../components/shared/Banner';
import Slide from '../../components/shared/Slide';
import slide from '../../static/imagens/slide2.jpg'
import CardInfo from '../../components/shared/CardInfo';
import banner from '../../static/imagens/banner.jpg'
import ver_mais from '../../static/icons/ver_mais.png';
import api from '../../services/api';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';


export default function  Home() {

    const [products,setProduct] = useState([]);
    const [acessorios,setAcessorios] = useState([]);
    const [pagscel,setpagescel] = useState(1);
    const [pagsacess,setpagesacess] = useState(1);
  
    useEffect(() => {
        loadProducts();
        loadAcessorios();

    },[])


  useEffect(() => {

    loadProducts();
     
    },[pagscel])

    useEffect(() => {

        loadAcessorios();
         
  },[pagsacess])
   
    


    async function  loadProducts(){
        await axios.get(api+'/selectproduct?op=totalporcat&namecat=celulares&pag='+pagscel).then(response => {
                    if(response.data.length===0){
                       return;
                    }else{
                setProduct([...products,...response.data]);
                    }
           
        }, response =>{
            console.log(response);
        })
    }
   
    async function  loadAcessorios(){
      await axios.get(api+'/selectproduct?op=totalporcat&namecat=acessorios&pag='+pagsacess).then(response => {
        if(response.data.length===0){
            return;
         }else{
            setAcessorios([...acessorios,...response.data]);
         }
        }, response =>{
            console.log(response);
        })
    }

    function setpluscel(){
        setpagescel(pagscel+1);
    }
    function setplusaacess(){
        setpagesacess(pagsacess+1);
    }
   
        return(
            <main className="default content">
                <Container maxWidth={ false } className="">
                    <Slide title="Slide aqui" text="Corpo do texto" slide={ slide } />
                    <Banner title="Celulares" foto={ banner } link="/celulares"/>
                    <Grid container spacing={1}   className="grid">
                       <div className="pptotal">
                        {products.map(product =>(
                            <Grid item xs={3} className="griditem">  
                                <CardInfo 
                                imagem={ product.url } 
                                titleHover={ product.nameproduct }
                                title={ product.nameproduct } 
                                subtitle={ product.value }
                                id={ product.id }
                                text={ product.description }
                                linkButton2={`/produto/${product.id}`} nameButton2="Ver mais" icon2={ ver_mais } altIcon2="Ver mais"
                               
                               />
                            </Grid>
                        ))}

                       </div>
                       <button className="info"  onClick={()=>{
                           setpluscel();
                       }}>
                         Ver Mais
                        </button>
                      
                    </Grid>
                    <Banner title="Acessórios" foto={ banner } link="/acessorios"/>
                    <Grid container spacing={1} className="grid">
                    <div className="pptotal">
                        {acessorios.map(acessorio =>(
                            <Grid item xs={3} className="griditem">
                                <CardInfo 
                                imagem={ acessorio.url } 
                                titleHover={ acessorio.nameproduct }
                                title={ acessorio.nameproduct } 
                                subtitle={ acessorio.value }
                                id={ acessorio.id }
                                text={ acessorio.description }
                                linkButton2={`/produto/${acessorio.id}`} nameButton2="Ver mais" icon2={ ver_mais } altIcon2="Ver mais"
                                />
                            </Grid>
                        ))}
                        </div>
                        <button className="info" onClick={()=>{
                           setplusaacess();
                       }}>
                         Ver Mais
                        </button>
                    </Grid>
                </Container>
            </main>
        );
    
}