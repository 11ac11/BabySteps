import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import './Dashboard.css'
import ChildView from './../ChildView/ChildView';
import { Link } from "react-router-dom";




export default function Dashboard() {
  const { currentUser } : any = getAuth();
  const userId = currentUser.uid
  console.log('User ID from dashboard:', userId);
  const [babyList, setBabyList] = useState<Baby[]>([]);
  const babyRef = useRef(false);

  type Baby = {
    name: string,
    date: string,
  }

  useEffect(() => {
    async function getData() {
      try {
        const userIdQuery = doc(db, 'users', userId);
        const response = await getDoc<any>(userIdQuery);
        const userData = response.data()
        return userData.babies.map((baby:any) => {
          return baby;
        });
      } catch(error) {
        console.log(error)
      }
    }
    getData()
      .then((result) => {
        babyRef.current = true;
        setBabyList(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, babyList]);

  return (
    <div className="main-container">
      <Navbar />
      <div className='dash-container'>
        <div className='dash-btns-cont'>
        {babyList.map(baby =>
          <Link to={baby.name}>
            <div className='baby-selector current-baby'>
              <p>{baby.name}</p>
            </div>
          </Link>)}

        <Link to={'/addbaby'}>
          <div className='baby-selector add-baby'>
            <span>+</span>
            <p>Add new baby</p>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
}

//TIMELINE CONTAIENR DOESN?T EXIST