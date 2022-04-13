import React from 'react'
import styled from 'styled-components';
import  {useState, useEffect} from 'react';
import Moment from 'moment';
import {toast} from 'react-toastify';
import { storage } from './Base';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {db} from './Base';
import Icon from '../img/whatsapp.jpg';
import Icon2 from '../img/fb.jpg';
import Icon3 from '../img/github.jpg';
import Icon4 from '../img/linkdin.jpg';
import {collection, addDoc, getDocs, doc, Timestamp } from 'firebase/firestore';
import { async } from '@firebase/util';


const Database = () => {
  const [Names, setNames] = useState([]);
  const [desc, setDesc] = useState('');
  const [github, setGithub] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [facebook, setFacebook] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [Avatar, setAvatar] = useState('');
  const collectionRef = collection(db, 'projecte');

  


  const CardId = async () => {
    await addDoc(collectionRef, {name:Names, description:desc, github:github, linkedIn:linkedIn,
    facebook:facebook, whatsapp:whatsapp, ola:Avatar})
    console.log(CardId)
  }

    
  const getData = async () => {
    const data = await getDocs(collectionRef);
    setNames(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
  }

useEffect(() => {
    getData()
    
  }, []);
  
  return (
    <Container>      
      <CardsHolder> 
             
        {Names.map((datas) => (
        <div key={datas.id}>
          <Card>
          <img style={{width:"250px", height:"200px",marginLeft:'-1px'}} src={datas.ola}/> 
          <CardTitle>{datas.name}</CardTitle>
          <CardDesc>{datas.description}</CardDesc><br/>
          <CardIcon>
          <CardDesc><a target='_blank' href={`${datas.github}`}><ImgIcon3></ImgIcon3></a></CardDesc>
          <CardDesc><a target='_blank' href={`${datas.linkedin}`}><ImgIcon4></ImgIcon4></a></CardDesc>
          <CardDesc><a target='_blank' href={`${datas.facebook}`}><ImgIcon2></ImgIcon2></a></CardDesc>
          <CardDesc><a target='_blank' href={`${datas.whatsapp}`}><ImgIcon></ImgIcon></a></CardDesc>
          </CardIcon>
          </Card>
          
        </div>
      ))}
      </CardsHolder>
    </Container>
  )
}

export default Database

const Container = styled.div`
  padding: 4rem;  
`

const CardsHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color:grey;
`
const Card = styled.div`
    margin: 2rem 2rem 2rem 0;
    padding: 1.5rem;
    width: 250px;
    box-shadow: 0 0 24px 2px rgba(0,0,0,0.1);
    transition: transform .1s ease;
    cursor: pointer;
    background-color:#ffffff;

    /* :hover {
        transform: scale(0.1);
    } */
`
const CardTitle = styled.div`
    font-weight: 800;
    font-size: 1.5rem;
`
const CardDesc = styled.div`
    font-size: 12px;
    font-style: italic;       
`
const  CardIcon  = styled.div`
    display: flex;
    justify-content: space-around;
      
`
const ImgIcon = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;
  background-image: url(${Icon});  
  background-size: cover;  
`
const ImgIcon2 = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;  
  background-image: url(${Icon2});
  background-size: cover;
  `
  const ImgIcon3 = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;   
  background-image: url(${Icon3});
  background-size: cover;
  `
  const ImgIcon4 = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;   
  background-image: url(${Icon4});  
  background-size: cover;
  `
