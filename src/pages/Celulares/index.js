import React, {useState,useEffect } from 'react';
import './style.css';
import '../../style.css';
import Container from '@material-ui/core/Container';
import Banner from '../../components/shared/Banner';
import banner from '../../static/imagens/bannepretor.jpg';
import CardInfo from '../../components/shared/CardInfo';
import Botao from '../../components/shared/Botao';
import ver_mais from '../../static/icons/ver_mais.png';
import api from '../../services/api';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import lupa from '../../static/icons/lupa.png'
import fecharPesquisa from '../../static/icons/fechar-pesquisa.png'


export default function Categoria() {

            const [products,setProduct] = useState([]);
            const [ordemAlfa,setOrdemAlfa] = useState([{ value:'Normal', opcao:'Normal' },{ value:'ASC', opcao:'Crescente' }, { value:'DESC', opcao:'Decrescente' }]);
            const [ordemPreco,setOrdemPreco] = useState([{ value:'Todos', opcao:'Todos' },{ value:'1-600', opcao:'Até R$ 600' } , { value:'601-700', opcao:'R$ 601 - R$ 700' }, { value:'701-800', opcao:'R$ 701 - R$ 800' }, { value:'801-900', opcao:'R$ 901 - R$ 1000' }]);
            const [ordemMarca,setordemMarca] = useState([{ value:'Todas', opcao:'Todas' },{ value:'Apple', opcao:'Apple' }, { value:'LG', opcao:'LG' } , { value:'Motorola', opcao:'Motorola' } , { value:'Samsung', opcao:'Samsung' } , { value: 'Xiaomi', opcao: 'Xiaomi' }]);
            const [ordem,setOrdem] = useState("Normal");
            const [preco,setPreco] = useState("Todos");
            const [marca,setMarca] = useState("Todas");
            const [pesquisado, setPesquisados] = useState([]);
            const[pags,setPags] = useState(1);
            const [pesquisa, setPesquisa] = useState('');
            const[pagsfiltro,setPagsfiltro] = useState(1);
            const[pagslimit,setpagslimit] = useState(false);
            const[porfiltroboolean,setPorfiltroboolean] = useState(false);

            
            useEffect(() => {

              loadProducts();
                  
            },[])

            useEffect(() => {  ///quando houver alteraco em pags dispara useEffect
            
                    loadProducts();
                

              },[pags])

              useEffect(() => {  
                    if((pagsfiltro!==1) & (porfiltroboolean==true)){
                        handleSubmit1();
                    }

              },[pagsfiltro]);
     
    
      function handleChangeOrdem(value) {
      
          setOrdem(value);
      }
      function handleChangePreco(value){
       
          setPreco(value);
      }
      function handleChangeMarca(value) {
        
          setMarca(value);
      }
      function setPlusPag(){
            console.log(pags);

         if(pagslimit==true){  //para nao retornar mais registros
            return;
         }else if(porfiltroboolean==false){
            setPags((pags+1));
         }else if(porfiltroboolean==true){

             setPagsfiltro(pagsfiltro+1);
         }
             
      }

      async function handleSubmit1(){
        let filter = '?op=totalporcat&namecat=celulares'
        if(ordem != 'Normal'){
            filter += `&order=${ordem}`
        }
        if(preco != 'Todos'){
            let prec = preco.split('-')
            let value1 = prec[0]
            let value2 = prec[1]
            filter += `&value1=${value1}&value2=${value2}`
        }
        if(marca != 'Todas'){
            filter += `&brand=${marca}`
        }
        await axios.get(api+`/selectproduct${filter}&pag=${pagsfiltro}`).then(response => {
           
            setProduct([...products,...response.data]);

        }, response =>{
            console.log(response)
        })
      }
    
      //tenho que chamar uma funcao pra ver mais sobrescrevendo o q ja tinha no usefecct
     async function handleSubmit(event) {
        event.preventDefault();
        setpagslimit(false);
        setPagsfiltro(1);
       
        let filter = '?op=totalporcat&namecat=celulares'
        if(ordem != 'Normal'){
            filter += `&order=${ordem}`
        }
        if(preco != 'Todos'){
            let prec = preco.split('-')
            let value1 = prec[0]
            let value2 = prec[1]
            filter += `&value1=${value1}&value2=${value2}`
        }
        if(marca != 'Todas'){
            filter += `&brand=${marca}`
        }
        await axios.get(api+`/selectproduct${filter}&pag=1`).then(response => {
            setProduct(response.data);

        }, response =>{
            console.log(response)
        })
       setPorfiltroboolean(true);  //agora a pesquisa esta sendo por filtro
      }

    async function loadProducts() {
        let filter = '?op=totalporcat&namecat=celulares'
        if(ordem != 'Normal'){
            filter += `&order=${ordem}`
        }
        if(preco != 'Todos'){
            let prec = preco.split('-')
            let value1 = prec[0]
            let value2 = prec[1]
            filter += `&value1=${value1}&value2=${value2}`
        }
        if(marca != 'Todas'){
            filter += `&brand=${marca}`
        }
        await axios.get(api+`/selectproduct${filter}&pag=${pags}`).then(response => {

            if(response.data.length==0){
                setpagslimit(true);
                return;
            }else{
                setProduct([...products,...response.data]);
            }
         
        }, response =>{
            console.log(response)
        })
    }
    async function pesquisar(event){
        event.preventDefault();
        if(pesquisa != ''){
            await axios.post(api+`/searchproducts?pag=${pags}&cat=celulares`,{"nameproduct":pesquisa}).then(response => {
                setPesquisados(response.data)
                if(response.data[0]){
                    let pesq = document.querySelector('.resultado-pesquisa')
                    pesq.style.display = 'block'
                }
            }, response =>{
            })
        }else{
            return
        }
    }
    function fechar_pesquisa(){
        let boxResultados = document.querySelector('.resultado-pesquisa');
        let btn = document.querySelector('#abrir-pesquisa');
        let btn2 = document.querySelector('#fechar-pesquisa');
        let pes = document.querySelector('.top-search');
        pes.style.display = 'none'
        btn2.style.display = 'none'  
        btn.style.display = 'block'
        boxResultados.style.display = 'none'
    }
    function abrir_pesquisa(){
        let btn = document.querySelector('#abrir-pesquisa');
        let btn2 = document.querySelector('#fechar-pesquisa');
        let pes = document.querySelector('.top-search');
        pes.style.display = 'block' 
        btn.style.display = 'none'  
        btn2.style.display = 'block' 
    }

   

        return(
            <main className="default content">
                <Container maxWidth={ false }>
                <div className="top-search">
                        <form onSubmit={ pesquisar }>
                            <div className="div-search">
                                <input type="search" defaultValue={ pesquisa } onChange={ (e) => setPesquisa(e.target.value) } name="search" placeholder="Pesquise algo" id="pes"/>
                                <button type="submit"><img src={ lupa } alt="Lupa" id="lupa"/></button>
                            </div>
                        </form>
                        <div className="fechar-pesquisa">
                            <img src={ fecharPesquisa } alt="Fechar barra de pesquisa" id="fechar-pesquisa" onClick={ fechar_pesquisa }/>
                        </div>
                    </div>
                    <div className="abrir-pesquisa">
                        <img src={ lupa } alt="Abrir barra de pesquisa" id="abrir-pesquisa" onClick={ abrir_pesquisa }/>
                    </div>
                    <div className="resultado-pesquisa">
                        <h1>Resultados da pesquisa</h1>
                            <Grid container spacing={1}   className="grid">
                            <div className="pptotal">
                            {pesquisado.map(pesquisa =>(
                            <Grid item xs={3} key={ pesquisa.id } className="griditem">  
                                <CardInfo 
                                imagem={ pesquisa.url } 
                                titleHover={ pesquisa.nameproduct }
                                title={ pesquisa.nameproduct } 
                                subtitle={ pesquisa.value }
                                id={ pesquisa.id }
                                text={ pesquisa.description }
                                linkButton2={`/produto/${(pesquisa.nameproduct.replace(/\s/g, "-")).replace("/","-")}/${pesquisa.id}`} nameButton2="Ver mais" icon2={ ver_mais } altIcon2="Ver mais"
                               
                               />
                            </Grid>
                            ))}
                            </div>
                    </Grid>
                    </div>
                    <Banner title="Celulares" foto={ banner } link="#"/>
                    <fieldset className="config">
                        <legend>Ordenar por</legend>
                        <form onSubmit={e=>{handleSubmit(e)}}>
                        <div className="filtro">
                            <div className="div-select">
                                <label htmlFor="alfa">Ordem alfabética:</label>
                                <select id="alfa" value={ordem} onChange={e=>{handleChangeOrdem(e.target.value)}} className="select">
                                    { ordemAlfa.map( ordem =>(
                                        <option key={ ordem.value } value={ ordem.value }>{ ordem.opcao }</option>
                                    )) }
                                </select>
                            </div>
                            <div className="div-select">
                                <label htmlFor="preco">Preço:</label>
                                <select id="preco" value={preco} onChange={e=>{handleChangePreco(e.target.value)}} className="select">
                                    { ordemPreco.map( ordem =>(
                                        <option key={ ordem.value } value={ ordem.value }>{ ordem.opcao }</option>
                                    )) }
                                </select>
                            </div>
                            <div className="div-select">
                                <label htmlFor="marca">Marca:</label>
                                <select id="marca" value={marca} onChange={e=>{handleChangeMarca(e.target.value)}} className="select">
                                    { ordemMarca.map( ordem =>(
                                        <option key={ ordem.value } value={ ordem.value }>{ ordem.opcao }</option>
                                    )) }
                                </select>
                            </div>
                            <div className="div-select">
                                <Botao name="Aplicar" tipo="submit" estilo="padrao" ></Botao>
                            </div>
                        </div>
                        </form>
                    </fieldset>
                    <div className="produtos">
                    <Grid container spacing={1}>
                        <div className="pptotal">
                        {products.map(product =>(
                            <Grid item xs={3} key={ product.id } className="griditem">
                                <CardInfo 
                                imagem={ product.url } 
                                titleHover={ product.nameproduct }
                                title={ product.nameproduct } 
                                subtitle={ product.value }
                                id={ product.id }
                                text={ product.description }
                                linkButton2={`/produto/${(product.nameproduct.replace(/\s/g, "-")).replace("/","-")}/${product.id}`} nameButton2="Ver mais" icon2={ ver_mais } altIcon2="Carrinho"
                                />
                            </Grid>
                        ))}
                        </div>
                        <button className="info" onClick={()=>{setPlusPag()}}>
                         Ver Mais
                        </button>
                    </Grid>
                 
                    </div>
                </Container>
            </main>
        );
    
}